import React, { useEffect, useState } from "react";
import { WorldMap } from "react-svg-worldmap";
import CountryDataService from "../../service/CountryDataService";
import "./Map.scss";
import { CountryCodeResponse, CountryData } from "./model/CountryData.model";

const countryData: CountryData[] = [];
const countryDataService = new CountryDataService();

const Map = () => {
  useEffect(() => {
    countryDataService.getAllCountryCode().then((res) => {
      res.data.forEach((item: CountryCodeResponse) => {
        countryData.push({
          country: item.alpha2Code,
          value: item.numericCode,
        });
      });
      setCodeLoading(true);
    });
  }, []);

  const [isLoadingCodeOver, setCodeLoading] = useState<boolean>(false);
  const handleOnclick = (
    countryName: string,
    countryCode: string,
    countryValue: string
  ) => {
    console.log("선택 국가 : " + countryCode);
    // TODO : 선택 국가 모달 띄우기
    return {};
  };

  return (
    <div className="MapWrapper">
      {isLoadingCodeOver && (
        <WorldMap
          color="green"
          backgroundColor="#CCFFFF"
          size="xxl"
          data={countryData}
          onClickFunction={(
            event: React.MouseEvent<SVGElement, Event>,
            countryName: string,
            isoCode: string,
            value: string
          ) => handleOnclick(countryName, isoCode, value)}
        />
      )}
    </div>
  );
};

export default Map;
