/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "10px": "10px",
      },
      height: {
        "492px": "496px",
        "300px": "300px",
        "312px": "312px",
      },
      width: {
        "806px": "806px",
        "332px": "332px",
        "300px": "300px",
        "237px": "237px",
      },
      margin: {
        "22px": "22px",
        "14px": "14px",
      },
      padding: {
        "10px": "10px",
        "6px": "6px",
      },
      colors: {
        "background-blue": "#060716",
        "background-component": "#090B12",
        "border-component": "#2B344D",
        "label-color": "#7685A0",
        "button-grey": "#171C2F",
        "input-background": "#040407",
        "input-border": "#171C2F",
        "input-text-color": "#B1BDD4",
        "input-button-background": "rgba(96, 103, 249, 0.25);",
        "input-button-color": "#8793FF",
        "withdraw-button-background": "#6067F9",
        "chart-green": "#5AB88B",
      },
      boxShadow: {
        "withdraw-shadow": "0px 4px 20px rgba(0, 0, 0, 0.75)",
        "menu-shadow": " 2px 4px 12px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
