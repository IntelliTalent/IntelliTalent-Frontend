import { useEffect, useState } from "react";

import Geonames from "geonames.js";
import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

interface GeoLocationOption {
  geonameId: number;
  countryName?: string;
  name?: string;
}

const geonames = Geonames({
  username: "thalesandrade",
  lan: "en",
  encoding: "JSON",
});

export default function GeoLocation({
  locationTitle,
  name,
  value,
  touched,
  error,
  handleChange,
  handleBlur,
  geoId,
  isCountry = false,
}: {
  locationTitle: string;
  name: string;
  value: string;
  touched: boolean | undefined;
  error: string | undefined;
  handleChange: any;
  handleBlur: any;
  geoId?: number | null;
  isCountry?: boolean;
}) {
  const [options, setOptions] = useState<GeoLocationOption[]>([]);

  useEffect(() => {
    try {
      const data = async () => {
        isCountry
          ? geonames.countryInfo({}).then((res) => {
              setOptions(res.geonames);
            })
          : geonames.children({ geonameId: geoId }).then((res) => {
              if (res.totalResultsCount) setOptions(res.geonames);
            });
      };

      data();
    } catch (err) {
      console.log(err);
    }
  }, [geoId, isCountry]);

  if (isCountry) {
    const country = options.filter(
      (v) => value.toLowerCase() === v.countryName!.toLowerCase()
    );
    if (country.length === 1) {
      const countryId = country[0].geonameId;
      handleChange({ target: { name, value: `${countryId}:${value}` } });
    }
  } else {
    const city = options.filter(
      (v) => value.toLowerCase() === v.name!.toLowerCase()
    );
    if (city.length === 1) {
      const cityId = city[0].geonameId;
      handleChange({ target: { name, value: `${cityId}:${value}` } });
    }
  }

  return (
    <FormControl fullWidth>
      <InputLabel id={`${locationTitle}-label`}>{locationTitle}</InputLabel>
      <Select
        labelId={`${locationTitle}-label`}
        label={locationTitle}
        value={value}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(touched) && Boolean(error)}
        MenuProps={{ PaperProps: { sx: { maxHeight: 300, maxWidth: 200 } } }}
      >
        {options.map((v, index) => (
          <MenuItem
            key={index}
            value={`${v.geonameId}:${isCountry ? v.countryName : v.name}`}
          >
            {isCountry ? v.countryName : v.name}
          </MenuItem>
        ))}
      </Select>
      {Boolean(touched) && (
        <Typography
          variant="body2"
          sx={{ color: "error.main", mt: 0.5, ml: 0.5 }}
        >
          {error}
        </Typography>
      )}
    </FormControl>
  );
}

GeoLocation.propTypes = {
  locationTitle: PropTypes.string,
  geoId: PropTypes.node,
  isCountry: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

GeoLocation.defaultProps = {
  onChange: undefined,
};
