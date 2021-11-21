export const OwlEyes = () => {
  return (
    <svg
      className="z-10"
      width="425"
      height="175"
      viewBox="0 0 425 175"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="85"
        cy="85"
        r="81.4583"
        fill="url(#paint0_linear_23_2624)"
        stroke="black"
        stroke-width="7.08333"
      />
      <circle
        cx="339.999"
        cy="85"
        r="81.4583"
        fill="url(#paint1_linear_23_2624)"
        stroke="black"
        stroke-width="7.08333"
      />
      <circle cx="85.0013" cy="85" r="28.3333" fill="black" />
      <circle cx="340" cy="85" r="28.3333" fill="black" />
      <defs>
        <linearGradient
          id="paint0_linear_23_2624"
          x1="85"
          y1="0"
          x2="85"
          y2="170"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#CC00FF" />
          <stop offset="1" stop-color="#1644E6" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_23_2624"
          x1="339.999"
          y1="0"
          x2="339.999"
          y2="170"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#CC00FF" />
          <stop offset="1" stop-color="#1644E6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const OwlBigText = () => {
  return (
    <svg
      width="1344"
      height="250"
      viewBox="0 0 1344 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M230 174C230 153 213.5 136 192.5 136C171.5 136 155 153 155 174C155 194.5 171.5 211.5 192.5 211.5C213.5 211.5 230 194.5 230 174ZM385 172.5C385 73 320.5 -27 193 -27C63.5 -27 0 73 0 172.5C0 272.5 63.5 373 193 373C320.5 373 385 272.5 385 172.5ZM310 174C310 238.5 270.5 303 193 303C114.5 303 75.5 238.5 75.5 174C75.5 108.5 114.5 43.5 193 43.5C270.5 43.5 310 108.5 310 174ZM919.309 46.5L868.309 184L789.309 -24C788.309 -26 786.309 -27 784.309 -27H716.309C714.309 -27 712.309 -26 711.809 -24L632.309 184L581.809 46.5H503.809L627.809 370C629.309 374 635.809 374 637.309 370L750.309 73.5L863.309 370C864.809 374 871.309 374 872.809 370L997.309 46.5H919.309ZM1337.88 298.5H1198.38H1121.88V368.5C1121.88 370.5 1124.38 373 1127.38 373H1337.88C1341.38 373 1343.38 370.5 1343.38 368.5V303.5C1343.38 301 1341.38 298.5 1337.88 298.5ZM1198.38 222V-22.5C1198.38 -24.5 1196.38 -27 1193.38 -27H1127.38C1124.38 -27 1121.88 -24.5 1121.88 -22.5V222H1198.38Z"
        fill="#EBEBEB"
      />
    </svg>
  );
};

export const OwlTopSection = () => {
  return (
    <section
      style={{ background: "hsla(0, 0%, 97%, 1)" }}
      className="w-full relative pt-2 h-full overflow-hidden"
    >
      <div className="w-full flex justify-center">
        <OwlEyes />
      </div>
      <div className="-top-8 -left-44 absolute">
        <OwlBigText />
      </div>
    </section>
  );
};
