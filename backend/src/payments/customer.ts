import Stripe from "stripe";
import { stripe } from "..";
import { getOrCreateUserPaymentDoc } from "../helpers/user_payment";
import User from "../models/user";
import UserPayment from "../models/user_payment";
import { runAsync } from "../utils";

/**
 * Get or create customer
 *
 * @param userId - User's mongoId
 */
export const getOrCreateCustomer = async (
  userId: string,
  params?: Stripe.CustomerCreateParams
) => {
  const [user, err1] = await runAsync(User.findOne({ _id: userId }).exec());
  if (err1 || !user) return null;

  // User exists and is in `user` var
  const paymentDoc = await getOrCreateUserPaymentDoc(userId);
  if (!paymentDoc) return null;

  const { stripeCustomerId } = paymentDoc;
  if (!stripeCustomerId) {
    // If user is not a stripe customer then make them
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        mongodbId: user._id.toString(),
      },
      ...params,
    });

    // Only drawback of adding the stripeCustomerId in the mongodb user
    // doc is that the data become stale
    const [, err2] = await runAsync(
      UserPayment.updateOne(
        {
          _id: paymentDoc._id,
        },
        { $set: { stripeCustomerId: customer.id } }
      ).exec()
    );
    if (err2) return null;

    return customer;
  } else {
    return (await stripe.customers.retrieve(
      stripeCustomerId
    )) as Stripe.Customer;
  }
};

/**
 * Setup intent API used is to save a payment method for future payments
 * without charging your customer right away.
 *
 * @returns Setup intent if created else null
 */
export const createSetupIntent = async (userId: string) => {
  const [customer, err] = await runAsync(getOrCreateCustomer(userId));
  if (err || !customer) return null;
  return await stripe.setupIntents.create({ customer: customer.id });
};
