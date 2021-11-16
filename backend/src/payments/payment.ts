import { stripe } from "..";
import { runAsync } from "../utils";
import { getOrCreateCustomer } from "./customer";

/**
 * Create payment intent and charge
 *
 * @remarks
 * For this user has to be authenticated
 *
 * @returns Paytment intent if customer is retrieved and payment intent is
 * created else null
 */
export const createPaymentIntentAndCharge = async (
  userId: string,
  amount: number,
  payment_method: string
) => {
  const customer = await getOrCreateCustomer(userId);
  if (!customer) return null;

  const [paymentIntent, err] = await runAsync(
    stripe.paymentIntents.create({
      amount,
      customer: customer.id,
      payment_method,
      currency: "inr",
      off_session: true,
      confirm: true,
    })
  );

  if (!paymentIntent || err) return null;
  return paymentIntent;
};
