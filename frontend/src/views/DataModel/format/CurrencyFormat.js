import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

//import api
import api from "../../../api/metabaseApi";

function CurrencyFormat(props) {
  const { status, index } = props;

  const [field, setField] = useState([]);
  const [id, setId] = useState("");

  const [currency, setCurrency] = useState("");
  const [currencyLabelStyle, setCurrencyLabelStyle] = useState("");
  const [currencyInHeader, setCurrencyInHeader] = useState("");
  const [numberSeparators, setNumberSeparators] = useState("");
  const [decimals, setDecimals] = useState("");
  const [scale, setScale] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");

  const [table, setTable] = useState("");
  const [name, setName] = useState("");

  //to get database table and display fields
  useEffect(() => {
    api
      .getTableIDMeta(status)
      .then((res) => {
        console.log(res);

        res.data.fields.map((x, i) => {
          if (i == index) {
            setField(x);
            setId(x.id);
            //get initial value for fields
            setCurrency(x.settings.currency);
            setCurrencyLabelStyle(x.settings.currency_style);
            setCurrencyInHeader(x.settings.currency_in_header);
            setNumberSeparators(x.settings.number_separators);
            setDecimals(x.settings.decimals);
            setScale(x.settings.scale);
            setPrefix(x.settings.prefix);
            setSuffix(x.settings.suffix);
            setName(x.display_name);
            setTable(res.data.display_name);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeCurrency = (e) => {
    setCurrency(e.target.value);
    field.settings.currency = e.target.value;
    //console.log("new currency: " + field.settings.currency);

    //to update currency
    api
      .updateField(field, id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeCurrencyLabelStyle = (e) => {
    setCurrencyLabelStyle(e.target.value);
    field.settings.currency_style = e.target.value;
    //console.log("new currency_style: " + field.settings.currency_style);

    //to update currency
    api
      .updateField(field, id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeCurrencyInHeader = (e) => {
    let showCurrencyInHeader;
    if (e.target.value === "true") {
      showCurrencyInHeader = true;
    } else {
      showCurrencyInHeader = false;
    }

    setCurrencyInHeader(e.target.value);
    field.settings.currency_in_header = showCurrencyInHeader;
    //console.log("new currency_in_header: " + field.settings.currency_in_header);
    //to update set mini bar
    api
      .updateField(field, id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeNumberSeparators = (e) => {
    setNumberSeparators(e.target.value);
    field.settings.number_separators = e.target.value;
    //console.log("new number_seperators: " + field.settings.number_separators);

    //to update number_separators
    api
      .updateField(field, id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeDecimals = (e) => {
    setDecimals(e.target.value);
    field.settings.decimals = e.target.value;
    //console.log("new decimals: " + field.settings.decimals);

    //to update decimals
    api
      .updateField(field, id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeScale = (e) => {
    setScale(e.target.value);
    field.settings.scale = e.target.value;
    //console.log("new scale: " + field.settings.scale);

    //to update scale
    api
      .updateField(field, id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changePrefix = (e) => {
    setPrefix(e.target.value);
    field.settings.prefix = e.target.value;
    //console.log("new prefix: " + field.settings.prefix);

    //to update prefix
    api
      .updateField(field, id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeSuffix = (e) => {
    setSuffix(e.target.value);
    field.settings.suffix = e.target.value;
    //console.log("new suffix: " + field.settings.suffix);

    //to update suffix
    api
      .updateField(field, id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let showCurrencyLabelStyle;
  if (currency === "USD") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ($)</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (US dollars)</option>
      </>
    );
  } else if (currency === "CAD") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol (CA$)</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Canadian dollars)</option>
      </>
    );
  } else if (currency === "EUR") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol (€)</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (euros)</option>
      </>
    );
  } else if (currency === "AED") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (UAE dirhams)</option>
      </>
    );
  } else if (currency === "AFN") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Afghan Afghanis)</option>
      </>
    );
  } else if (currency === "ALL") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Albanian lekë)</option>
      </>
    );
  } else if (currency === "AMD") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Armenian drams)</option>
      </>
    );
  } else if (currency === "ARS") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Argentine pesos)</option>
      </>
    );
  } else if (currency === "AUD") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol (A$)</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Australian dollars)</option>
      </>
    );
  } else if (currency === "AZN") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Azerbaijani manats)</option>
      </>
    );
  } else if (currency === "BAM") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">
          Name (Bosnia-Herzegovina convertible marks)
        </option>
      </>
    );
  } else if (currency === "BDT") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Bangladeshi takas)</option>
      </>
    );
  } else if (currency === "BHD") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Bahraini dinars)</option>
      </>
    );
  } else if (currency === "BIF") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Burundian francs)</option>
      </>
    );
  } else if (currency === "BND") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Brunei dollars)</option>
      </>
    );
  } else if (currency === "BOB") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Bolivian bolivianos)</option>
      </>
    );
  } else if (currency === "BRL") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol (R$)</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Brazilian reals)</option>
      </>
    );
  } else if (currency === "BWP") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Botswanan pulas)</option>
      </>
    );
  } else if (currency === "BYR") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name ({currency})</option>
      </>
    );
  } else if (currency === "BZD") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Belize dollars)</option>
      </>
    );
  } else if (currency === "CDF") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Congolese francs)</option>
      </>
    );
  } else if (currency === "CHF") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Swiss francs)</option>
      </>
    );
  } else if (currency === "CLP") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Chilean pesos)</option>
      </>
    );
  } else if (currency === "CNY") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol (CN¥)</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Chinese yuan)</option>
      </>
    );
  } else if (currency === "COP") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Colombian pesos)</option>
      </>
    );
  } else if (currency === "CRC") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Costa Rican colóns)</option>
      </>
    );
  } else if (currency === "CVE") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Cape Verdean escudos)</option>
      </>
    );
  } else if (currency === "CZK") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Czech korunas)</option>
      </>
    );
  } else if (currency === "DJF") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Djiboutian francs)</option>
      </>
    );
  } else if (currency === "DKK") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Danish kroner)</option>
      </>
    );
  } else if (currency === "DOP") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Dominican pesos)</option>
      </>
    );
  } else if (currency === "DZD") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Algerian dinars)</option>
      </>
    );
  } else if (currency === "EEK") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name ({currency})</option>
      </>
    );
  } else if (currency === "EGP") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Egyptian pounds)</option>
      </>
    );
  } else if (currency === "ERN") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Eritrean nakfas)</option>
      </>
    );
  } else if (currency === "ETB") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Ethiopian birrs)</option>
      </>
    );
  } else if (currency === "GBP") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol (£)</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (British pounds)</option>
      </>
    );
  } else if (currency === "GEL") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Georgian laris)</option>
      </>
    );
  } else if (currency === "GHS") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Ghanaian cedis)</option>
      </>
    );
  } else if (currency === "GNF") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Guinean francs)</option>
      </>
    );
  } else if (currency === "GTQ") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Guatemalan quetzals)</option>
      </>
    );
  } else if (currency === "HKD") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol (HK$)</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Hong Kong dollars)</option>
      </>
    );
  } else if (currency === "HNL") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Honduran lempiras)</option>
      </>
    );
  } else if (currency === "HRK") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Croatian kunas)</option>
      </>
    );
  } else if (currency === "HUF") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Hungarian forints)</option>
      </>
    );
  } else if (currency === "IDR") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Indonesian rupiahs)</option>
      </>
    );
  } else if (currency === "ILS") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol (₪)</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Israeli new shekels)</option>
      </>
    );
  } else if (currency === "INR") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol (₹)</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Indian rupees)</option>
      </>
    );
  } else if (currency === "IQD") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Iraqi dinars)</option>
      </>
    );
  } else if (currency === "IRR") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Iranian rials)</option>
      </>
    );
  } else if (currency === "ISK") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Icelandic krónur)</option>
      </>
    );
  } else if (currency === "JMD") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Jamaican dollars)</option>
      </>
    );
  } else if (currency === "JOD") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Jordanian dinars)</option>
      </>
    );
  } else if (currency === "JPY") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol (¥)</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Japanese yen)</option>
      </>
    );
  } else if (currency === "KES") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Kenyan shillings)</option>
      </>
    );
  } else if (currency === "KHR") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Cambodian riels)</option>
      </>
    );
  } else if (currency === "KMF") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Comorian francs)</option>
      </>
    );
  } else if (currency === "KRW") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol (₩)</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (South Korean won)</option>
      </>
    );
  } else if (currency === "KWD") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Kuwaiti dinars)</option>
      </>
    );
  } else if (currency === "KZT") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Kazakhstani tenges)</option>
      </>
    );
  } else if (currency === "LBP") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Lebanese pounds)</option>
      </>
    );
  } else if (currency === "LKR") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Sri Lankan rupees)</option>
      </>
    );
  } else if (currency === "LTL") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name ({currency})</option>
      </>
    );
  } else if (currency === "LVL") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name ({currency})</option>
      </>
    );
  } else if (currency === "LYD") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Libyan dinars)</option>
      </>
    );
  } else if (currency === "MAD") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Moroccan dirhams)</option>
      </>
    );
  } else if (currency === "MDL") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Moldovan lei)</option>
      </>
    );
  } else if (currency === "MGA") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Malagasy ariaries)</option>
      </>
    );
  } else if (currency === "MKD") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Macedonian denari)</option>
      </>
    );
  } else if (currency === "MMK") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Myanmar kyats)</option>
      </>
    );
  } else if (currency === "MOP") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Macanese patacas)</option>
      </>
    );
  } else if (currency === "MUR") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Mauritian rupees)</option>
      </>
    );
  } else if (currency === "MXN") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol (MX$)</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Mexican pesos)</option>
      </>
    );
  } else if (currency === "MYR") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Malaysian ringgits)</option>
      </>
    );
  } else if (currency === "MZN") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Mozambican meticals)</option>
      </>
    );
  } else if (currency === "NAD") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Namibian dollars)</option>
      </>
    );
  } else if (currency === "NGN") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Nigerian nairas)</option>
      </>
    );
  } else if (currency === "NIO") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Nicaraguan córdobas)</option>
      </>
    );
  } else if (currency === "NOK") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Norwegian kroner)</option>
      </>
    );
  } else if (currency === "NPR") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Nepalese rupees)</option>
      </>
    );
  } else if (currency === "NZD") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol (NZ$)</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (New Zealand dollars)</option>
      </>
    );
  } else if (currency === "OMR") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Omani rials)</option>
      </>
    );
  } else if (currency === "PAB") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Panamanian balboas)</option>
      </>
    );
  } else if (currency === "PEN") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Peruvian soles)</option>
      </>
    );
  } else if (currency === "PHP") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Philippine pisos)</option>
      </>
    );
  } else if (currency === "PKR") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Pakistani rupees)</option>
      </>
    );
  } else if (currency === "PLN") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Polish zlotys)</option>
      </>
    );
  } else if (currency === "PYG") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Paraguayan guaranis)</option>
      </>
    );
  } else if (currency === "QAR") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Qatari rials)</option>
      </>
    );
  } else if (currency === "RON") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Romanian lei)</option>
      </>
    );
  } else if (currency === "RSD") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Serbian dinars)</option>
      </>
    );
  } else if (currency === "RUB") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Russian rubles)</option>
      </>
    );
  } else if (currency === "RWF") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Rwandan francs)</option>
      </>
    );
  } else if (currency === "SAR") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Saudi riyals)</option>
      </>
    );
  } else if (currency === "SDG") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Sudanese pounds)</option>
      </>
    );
  } else if (currency === "SEK") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Swedish kronor)</option>
      </>
    );
  } else if (currency === "SGD") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Singapore dollars)</option>
      </>
    );
  } else if (currency === "SOS") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Somali shillings)</option>
      </>
    );
  } else if (currency === "SYP") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Syrian pounds)</option>
      </>
    );
  } else if (currency === "THB") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Thai baht)</option>
      </>
    );
  } else if (currency === "TND") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Tunisian dinars)</option>
      </>
    );
  } else if (currency === "TOP") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Tongan pa'anga)</option>
      </>
    );
  } else if (currency === "TRY") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Turkish Lira)</option>
      </>
    );
  } else if (currency === "TTD") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Trinidad & Tobago dollars)</option>
      </>
    );
  } else if (currency === "TWD") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol (NT$)</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (New Taiwan dollars)</option>
      </>
    );
  } else if (currency === "TZS") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Tanzanian shillings)</option>
      </>
    );
  } else if (currency === "UAH") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Ukrainian hryvnias)</option>
      </>
    );
  } else if (currency === "UGX") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Ugandan shillings)</option>
      </>
    );
  } else if (currency === "UYU") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Uruguayan pesos)</option>
      </>
    );
  } else if (currency === "UZS") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Uzbekitasni som)</option>
      </>
    );
  } else if (currency === "VEF") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name ({currency})</option>
      </>
    );
  } else if (currency === "VND") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol (₫)</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Vietnamese dong)</option>
      </>
    );
  } else if (currency === "XAF") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol (FCFA)</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Central African CFA francs)</option>
      </>
    );
  } else if (currency === "XOF") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol (CFA)</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (West African CFA francs)</option>
      </>
    );
  } else if (currency === "YER") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (Yemeni rials)</option>
      </>
    );
  } else if (currency === "ZAR") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name (South African rand)</option>
      </>
    );
  } else if (currency === "ZMK") {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol ({currency})</option>
        <option value="code">Code ({currency})</option>
        <option value="name">Name ({currency})</option>
      </>
    );
  } else {
    showCurrencyLabelStyle = (
      <>
        <option value="symbol">Symbol</option>
        <option value="code">Code</option>
        <option value="name">Name</option>
      </>
    );
  }

  return (
    <>
      <Container fluid>
        <Row style={{ marginBottom: 50, marginTop: 20 }}>
          <Col>
            <Row>
              {/*Unit of currency*/
              /*currency*/}
              <Form style={{ width: 1000, marginLeft: 20 }}>
                <Form.Group>
                  <Form.Label>Unit of currency</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    value={currency}
                    onChange={changeCurrency}
                  >
                    <option value="USD">US Dollar</option>
                    <option value="CAD">Canadian Dollar</option>
                    <option value="EUR">Euro</option>
                    <option value="AED">United Arab Emirates Dirham</option>
                    <option value="AFN">Afghan Afghani</option>
                    <option value="ALL">Albanian Lek</option>
                    <option value="AMD">Armenian Dram</option>
                    <option value="ARS">Argentine Peso</option>
                    <option value="AUD">Australian Dollar</option>
                    <option value="AZN">Azerbaijani Manat</option>
                    <option value="BAM">
                      Bosnia-Herzegovina Convertible Mark
                    </option>
                    <option value="BDT">Bangladeshi Taka</option>
                    <option value="BGN">Bulgarian Lev</option>
                    <option value="BHD">Bahraini Dinar</option>
                    <option value="BIF">Burundian Franc</option>
                    <option value="BND">Brunei Dollar</option>
                    <option value="BOB">Bolivian Boliviano</option>
                    <option value="BRL">Brazilian Real</option>
                    <option value="BWP">Botswanan Pula</option>
                    <option value="BYR">Belarusian Ruble</option>
                    <option value="BZD">Belize Dollar</option>
                    <option value="CDF">Congolese Franc</option>
                    <option value="CHF">Swiss Franc</option>
                    <option value="CLP">Chilean Peso</option>
                    <option value="CNY">Chinese Yuan</option>
                    <option value="COP">Colombian Peso</option>
                    <option value="CRC">Costa Rican Colón</option>
                    <option value="CVE">Cape Verdean Escudo</option>
                    <option value="CZK">Czech Republic Koruna</option>
                    <option value="DJF">Djiboutian Franc</option>
                    <option value="DKK">Danish Krone</option>
                    <option value="DOP">Dominican Peso</option>
                    <option value="DZD">Algerian Dinar</option>
                    <option value="EEK">Estonian Kroon</option>
                    <option value="EGP">Egyptian Pound</option>
                    <option value="ERN">Eritrean Nakfa</option>
                    <option value="ETB">Ethiopian Birr</option>
                    <option value="GBP">British Pound Sterling</option>
                    <option value="GEL">Georgian Lari</option>
                    <option value="GHS">Ghanaian Cedi</option>
                    <option value="GNF">Guinean Franc</option>
                    <option value="GTQ">Guatemalan Quetzal</option>
                    <option value="HKD">Hong Kong Dollar</option>
                    <option value="HNL">Honduran Lempira</option>
                    <option value="HRK">Croatian Kuna</option>
                    <option value="HUF">Hungarian Forint</option>
                    <option value="IDR">Indonesian Rupiah</option>
                    <option value="ILS">Israeli New Sheqel</option>
                    <option value="INR">Indian Rupee</option>
                    <option value="IQD">Iraqi Dinar</option>
                    <option value="IRR">Iranian Rial</option>
                    <option value="ISK">Icelandic Króna</option>
                    <option value="JMD">Jamaican Dollar</option>
                    <option value="JOD">Jordanian Dinar</option>
                    <option value="JPY">Japanese Yen</option>
                    <option value="KES">Kenyan Shilling</option>
                    <option value="KHR">Cambodian Riel</option>
                    <option value="KMF">Comorian Franc</option>
                    <option value="KRW">South Korean Won</option>
                    <option value="KWD">Kuwaiti Dinar</option>
                    <option value="KZT">Kazakhstani Tenge</option>
                    <option value="LBP">Lebanese Pound</option>
                    <option value="LKR">Sri Lankan Rupee</option>
                    <option value="LTL">Lithuanian Litas</option>
                    <option value="LVL">Latvian Lats</option>
                    <option value="LYD">Libyan Dinar</option>
                    <option value="MAD">Moroccan Dirham</option>
                    <option value="MDL">Moldovan Leu</option>
                    <option value="MGA">Malagasy Ariary</option>
                    <option value="MKD">Macedonian Denar</option>
                    <option value="MMK">Myanma Kyat</option>
                    <option value="MOP">Macanese Pataca</option>
                    <option value="MUR">Mauritian Rupee</option>
                    <option value="MXN">Mexican Peso</option>
                    <option value="MYR">Malaysian Ringgit</option>
                    <option value="MZN">Mozambican Metical</option>
                    <option value="NAD">Namibian Dollar</option>
                    <option value="NGN">Nigerian Naira</option>
                    <option value="NIO">Nicaraguan Córdoba</option>
                    <option value="NOK">Norwegian Krone</option>
                    <option value="NPR">Nepalese Rupee</option>
                    <option value="NZD">New Zealand Dollar</option>
                    <option value="OMR">Omani Rial</option>
                    <option value="PAB">Panamanian Balboa</option>
                    <option value="PEN">Peruvian Nuevo Sol</option>
                    <option value="PHP">Philippine Peso</option>
                    <option value="PKR">Pakistani Rupee</option>
                    <option value="PLN">Polish Zloty</option>
                    <option value="PYG">Paraguayan Guarani</option>
                    <option value="QAR">Qatari Rial</option>
                    <option value="RON">Romanian Leu</option>
                    <option value="RSD">Serbian Dinar</option>
                    <option value="RUB">Russian Ruble</option>
                    <option value="RWF">Rwandan Franc</option>
                    <option value="SAR">Saudi Riyal</option>
                    <option value="SDG">Sudanese Pound</option>
                    <option value="SEK">Swedish Krona</option>
                    <option value="SGD">Singapore Dollar</option>
                    <option value="SOS">Somali Shilling</option>
                    <option value="SYP">Syrian Pound</option>
                    <option value="THB">Thai Baht</option>
                    <option value="TOP">Tongan Pa'anga</option>
                    <option value="TRY">Turkish Lira</option>
                    <option value="TTD">Trinidad and Tobago Dollar</option>
                    <option value="TWD">New Taiwan Dollar</option>
                    <option value="TZS">Tanzanian Shilling</option>
                    <option value="UAH">Ukrainian Hryvnia</option>
                    <option value="UGX">Ugandan Shilling</option>
                    <option value="UYU">Uruguayan Peso</option>
                    <option value="UZS">Uzbekistan Som</option>
                    <option value="VEF">Venezuelan Bolivar</option>
                    <option value="VND">Vietnamese Dong</option>
                    <option value="XAF">CFA Franc BEAC</option>
                    <option value="XOF">CFA Franc BCEAO</option>
                    <option value="YER">Yemeni Rial</option>
                    <option value="ZAR">South African Rand</option>
                    <option value="ZMK">Zambian Kwacha</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Row>
            <Row>
              {/*Currency label style*/
              /*currency_style*/}
              <Form style={{ width: 1000, marginLeft: 20 }}>
                <Form.Group>
                  <Form.Label>Currency label style</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    value={currencyLabelStyle}
                    onChange={changeCurrencyLabelStyle}
                  >
                    {showCurrencyLabelStyle}
                  </Form.Control>
                </Form.Group>
              </Form>
            </Row>
            <Row>
              {/*Where to display the unit of currency*/
              /*currency_in_header*/}
              <Form style={{ width: 1000, marginLeft: 20 }}>
                <Form.Group>
                  <Form.Label>Where to display the unit of currency</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    value={currencyInHeader}
                    onChange={changeCurrencyInHeader}
                  >
                    <option value="true">In the column heading</option>
                    <option value="false">In every table cell</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Row>
            <Row>
              {/*Seperator style*/
              /*number_separators*/}
              <Form style={{ width: 1000, marginLeft: 20 }}>
                <Form.Group>
                  <Form.Label>Seperator style</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    value={numberSeparators}
                    onChange={changeNumberSeparators}
                  >
                    <option value=".,">100,000.00</option>
                    <option value=", ">100 000,00</option>
                    <option value=",.">100.000,00</option>
                    <option value=".">100000.00</option>
                    <option value=".’">100'000.00</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Row>
            <Row>
              {/* Minimum number of decimal places */
              /* decimals */}
              <Form style={{ width: 1000, marginLeft: 20 }}>
                <Form.Group>
                  <Form.Label>Minimum number of decimal places</Form.Label>
                  <Form.Control
                    type="number"
                    value={decimals}
                    onChange={changeDecimals}
                  />
                </Form.Group>
              </Form>
            </Row>
            <Row>
              {/* Multiply by a number */
              /* scale */}
              <Form style={{ width: 1000, marginLeft: 20 }}>
                <Form.Group>
                  <Form.Label>Multiply by a number</Form.Label>
                  <Form.Control
                    type="number"
                    value={scale}
                    onChange={changeScale}
                  />
                </Form.Group>
              </Form>
            </Row>
            <Row>
              {/* Add a prefix */
              /* prefix */}
              <Form style={{ width: 1000, marginLeft: 20 }}>
                <Form.Group>
                  <Form.Label>Add a prefix</Form.Label>
                  <Form.Control
                    type="text"
                    value={prefix}
                    onChange={changePrefix}
                  />
                </Form.Group>
              </Form>
            </Row>
            <Row>
              {/* Add a suffix */
              /* suffix */}
              <Form style={{ width: 1000, marginLeft: 20 }}>
                <Form.Group>
                  <Form.Label>Add a suffix</Form.Label>
                  <Form.Control
                    type="text"
                    value={suffix}
                    onChange={changeSuffix}
                  />
                </Form.Group>
              </Form>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CurrencyFormat;
