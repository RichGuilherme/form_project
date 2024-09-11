
const formatData = (data: string | number, typeValue: "money" | "uni" | "weight") => {
  let formatData = data;

  if (typeof formatData === "number") {
    formatData = String(formatData);
  }

  switch (typeValue) {
    case "money":
      formatData = formatData.replace("R$", "").replace(/\./g, "").replace(",", ".").trim();
      break;

    case "uni":
      formatData = formatData.replace(" uni", "").replace(/^(0+)(\d)/g, "$2").trim();
      break;

    case "weight":
      formatData = formatData.replace(" kg", "").trim().replace(",", ".");
      break;
  }

  return formatData;
};

export default formatData;