import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  jobPlaces,
  jobSources,
  jobTypes,
  publishDates,
} from "../../constants/jobs.contants";
import { FlexBetween } from "../ui";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";

const JobTitle = ({
  jobTitle,
  setJobTitle,
}: {
  jobTitle: string;
  setJobTitle: any;
}) => {
  return (
    <TextField
      name="jobTitle"
      label="Job Title"
      value={jobTitle}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setJobTitle(event.target.value);
      }}
    />
  );
};

const JobLocation = ({
  jobLocation,
  setJobLocation,
}: {
  jobLocation: string;
  setJobLocation: any;
}) => {
  return (
    <TextField
      name="jobLocation"
      label="Job Location"
      value={jobLocation}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setJobLocation(event.target.value);
      }}
    />
  );
};

const JobType = ({
  jobType,
  setJobType,
}: {
  jobType: string[];
  setJobType: any;
}) => {
  const handleChange = (event: SelectChangeEvent<typeof jobType>) => {
    const {
      target: { value },
    } = event;
    setJobType(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="job-type">Job Type</InputLabel>
      <Select
        name="jobType"
        labelId="job-type"
        multiple
        value={jobType}
        onChange={handleChange}
        input={<OutlinedInput label="Job Type" />}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 150,
            },
          },
        }}
      >
        {jobTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const PublishDate = ({
  publishDate,
  setPublishDate,
}: {
  publishDate: string;
  setPublishDate: any;
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setPublishDate(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="publish-date">Publish Date</InputLabel>
      <Select
        name="publishDate"
        labelId="publish-date"
        value={publishDate}
        label="Publish Date"
        onChange={handleChange}
      >
        {publishDates.map((date) => (
          <MenuItem key={date} value={date}>
            {date}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const JobPlace = ({
  jobPlace,
  setJobPlace,
}: {
  jobPlace: string[];
  setJobPlace: any;
}) => {
  const handleChange = (event: SelectChangeEvent<typeof jobPlace>) => {
    const {
      target: { value },
    } = event;
    setJobPlace(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="job-place">Job Place</InputLabel>
      <Select
        name="jobPlace"
        labelId="job-place"
        multiple
        value={jobPlace}
        onChange={handleChange}
        input={<OutlinedInput label="Job Place" />}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 150,
            },
          },
        }}
      >
        {jobPlaces.map((place) => (
          <MenuItem key={place} value={place}>
            {place}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const JobSource = ({
  jobSource,
  setJobSource,
}: {
  jobSource: string[];
  setJobSource: any;
}) => {
  const handleChange = (event: SelectChangeEvent<typeof jobSource>) => {
    const {
      target: { value },
    } = event;
    setJobSource(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="job-source">Job Source</InputLabel>
      <Select
        name="jobSource"
        labelId="job-source"
        multiple
        value={jobSource}
        onChange={handleChange}
        input={<OutlinedInput label="Job Source" />}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 150,
            },
          },
        }}
      >
        {jobSources.map((source) => (
          <MenuItem key={source} value={source}>
            {source}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const ComputerScienceRequired = ({
  computerScienceRequired,
  setComputerScienceRequired,
}: {
  computerScienceRequired: string;
  setComputerScienceRequired: any;
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setComputerScienceRequired(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="cs-required">Computer Science</InputLabel>
      <Select
        name="csRequired"
        labelId="cs-required"
        value={computerScienceRequired}
        label="Computer Science"
        onChange={handleChange}
      >
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Select>
    </FormControl>
  );
};

function FilterSection({
  filterJobs,
  jobTitle,
  setJobTitle,
  jobLocation,
  setJobLocation,
  jobType,
  setJobType,
  publishDate,
  setPublishDate,
  jobPlace,
  setJobPlace,
  computerScienceRequired,
  setComputerScienceRequired,
  jobSource,
  setJobSource,
}: {
  filterJobs: any;
  jobTitle: string;
  setJobTitle: any;
  jobLocation: string;
  setJobLocation: any;
  jobType: string[];
  setJobType: any;
  publishDate: string;
  setPublishDate: any;
  jobPlace: string[];
  setJobPlace: any;
  computerScienceRequired: string;
  setComputerScienceRequired: any;
  jobSource: string[];
  setJobSource: any;
}) {
  const [filtersCleared, setFiltersCleared] = useState(false);

  const clearFilters = () => {
    setJobTitle("");
    setJobLocation("");
    setJobType([]);
    setPublishDate("");
    setJobPlace([]);
    setComputerScienceRequired("");
    setFiltersCleared(true);
    setJobSource([]);
  };

  useEffect(() => {
    if (filtersCleared) {
      filterJobs(1);
      setFiltersCleared(false);
    }
  }, [
    filtersCleared,
    filterJobs,
    jobTitle,
    jobLocation,
    jobType,
    publishDate,
    jobPlace,
    computerScienceRequired,
    jobSource,
  ]);

  return (
    <FlexBetween className="gap-3">
      <div className="grid gap-3 items-center grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
        <JobTitle jobTitle={jobTitle} setJobTitle={setJobTitle} />

        <JobLocation
          jobLocation={jobLocation}
          setJobLocation={setJobLocation}
        />

        <JobType jobType={jobType} setJobType={setJobType} />

        <PublishDate
          publishDate={publishDate}
          setPublishDate={setPublishDate}
        />

        <JobSource jobSource={jobSource} setJobSource={setJobSource} />

        <JobPlace jobPlace={jobPlace} setJobPlace={setJobPlace} />

        <ComputerScienceRequired
          computerScienceRequired={computerScienceRequired}
          setComputerScienceRequired={setComputerScienceRequired}
        />
      </div>

      <Stack spacing={2}>
        <Button variant="contained" size="large" onClick={filterJobs}>
          <FilterAltIcon />
          Filter
        </Button>

        <Button
          variant="contained"
          size="large"
          color="error"
          onClick={clearFilters}
        >
          <ClearIcon />
          Clear
        </Button>
      </Stack>
    </FlexBetween>
  );
}

export default FilterSection;
