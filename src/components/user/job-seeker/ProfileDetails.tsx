import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Modal,
  Snackbar,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { ProfilePageTabs } from "../../../enums";
import { FlexBetween } from "../../ui";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import useColors from "../../../hooks/useColor";

import TodayIcon from "@mui/icons-material/Today";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { IUser } from "../../../types";
import { IProfileDetails } from "../../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  createCV,
  createCoverLetter,
  editProfile,
} from "../../../api/profiles";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "../../../api/core";

function UserProfileDetails({
  user,
  profile,
}: {
  user: IUser;
  profile: IProfileDetails;
}) {
  const { primary, secondary, error } = useColors();
  const [currentTab, setCurrentTab] = useState<ProfilePageTabs>(
    ProfilePageTabs.ABOUT
  );

  const currentUser = useSelector((state: RootState) => state.user.user);

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [uploadCVModalOpen, setUploadCVModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  const handleChange = (_event: SyntheticEvent, newValue: ProfilePageTabs) => {
    setCurrentTab(newValue);
  };

  const handleCreateCV = async () => {
    try {
      setLoading(true);

      const response = await createCV(profile.id);
      if (!response.word && response.error) {
        setSnackbarOpen(true);
        setSnackbarType("error");
        setSnackbarMessage(response.error);
      }

      window.open(response.word, "_blank");

      setSnackbarOpen(true);
      setSnackbarType("success");
      setSnackbarMessage("Successfully created CV");
    } catch (error) {
      setSnackbarOpen(true);
      setSnackbarType("error");
      setSnackbarMessage("Failed to create a CV");
    }

    setTimeout(() => {
      setSnackbarOpen(false);
      setLoading(false);
      window.location.reload();
    }, 3000);
  };

  const handleCreateCoverLetter = async () => {
    try {
      setLoading(true);

      const response = await createCoverLetter(
        profile.id,
        profile.jobTitle,
        companyName
      );
      if (!response.word && response.error) {
        setSnackbarOpen(true);
        setSnackbarType("error");
        setSnackbarMessage(response.error);
      }

      window.open(response.word, "_blank");

      setSnackbarOpen(true);
      setSnackbarType("success");
      setSnackbarMessage("Successfully created Cover Letter");
    } catch (error) {
      setSnackbarOpen(true);
      setSnackbarType("error");
      setSnackbarMessage("Failed to create a Cover Letter");
    }

    setTimeout(() => {
      setApplyModalOpen(false);
      setSnackbarOpen(false);
      setLoading(false);
    }, 3000);
  };

  const handleUploadCV = async () => {
    try {
      setLoading(true);

      if (acceptedFiles.length > 0) {
        const { link } = await uploadFile(acceptedFiles[0]);

        await editProfile(profile.id, {
          cv: link,
        });
      }

      setSnackbarOpen(true);
      setSnackbarType("success");
      setSnackbarMessage("Successfully uploaded your CV");
    } catch (error) {
      setSnackbarOpen(true);
      setSnackbarType("error");
      setSnackbarMessage("Failed to upload your CV");
    }

    setTimeout(() => {
      setUploadCVModalOpen(false);
      setSnackbarOpen(false);
      setLoading(false);
      window.location.reload();
    }, 3000);
  };

  const renderHeader = (
    <div className="py-5">
      <FlexBetween className="flex-wrap gap-2">
        <FlexBetween className="gap-4">
          <Avatar
            alt={user.firstName}
            src={user.photo}
            sx={{ width: 100, height: 100 }}
          />

          <div className="space-y-2">
            <h1 className="text-4xl font-bold">
              {user.firstName + " " + user.lastName}
            </h1>
            <h3>
              {profile.jobTitle} / {user.country}
            </h3>
          </div>
        </FlexBetween>

        {currentUser && currentUser.id === user.id && (
          <div className="flex m-auto sm:m-0 flex-row sm:flex-col gap-2">
            <FlexBetween gap={2}>
              <Button
                variant="contained"
                onClick={handleCreateCV}
                disabled={loading}
              >
                Create CV
              </Button>

              <Button
                variant="contained"
                onClick={() => setUploadCVModalOpen(true)}
                disabled={loading}
              >
                Upload CV
              </Button>
            </FlexBetween>

            <Button
              variant="contained"
              onClick={() => setApplyModalOpen(true)}
              disabled={loading}
            >
              Create CoverLetter
            </Button>
          </div>
        )}
      </FlexBetween>

      <div className="mt-5 ms-5 space-y-2">
        <p className="flex items-center gap-1">
          <TodayIcon style={{ color: secondary }} /> Joined{" "}
          {format(user.joinDate!, "MMM yyyy")}
        </p>

        {profile.cv ? (
          <p className="flex items-center gap-1">
            <ContactPageIcon style={{ color: error }} />{" "}
            <Link to={profile.cv} target="_blank" className="hover:underline">
              {user?.firstName + "'s CV"}
            </Link>
          </p>
        ) : (
          currentUser &&
          currentUser.id === user.id && (
            <p className="flex items-center gap-1">
              <ContactPageIcon style={{ color: error }} />{" "}
              <span
                className="hover:underline cursor-pointer"
                onClick={() => setUploadCVModalOpen(true)}
              >
                Upload CV
              </span>
            </p>
          )
        )}

        {profile.linkedIn && (
          <p className="flex items-center gap-1">
            <LinkedInIcon style={{ color: primary }} />{" "}
            <Link
              to={profile.linkedIn}
              target="_blank"
              className="hover:underline"
            >
              {profile.linkedIn.split("/")[4] || profile.linkedIn}
            </Link>
          </p>
        )}

        {profile.github && (
          <p className="flex items-center gap-1">
            <GitHubIcon />{" "}
            <Link
              to={profile.github}
              target="_blank"
              className="hover:underline"
            >
              {profile.github.split("/")[3] || profile.github}
            </Link>
          </p>
        )}
      </div>
    </div>
  );

  const renderAbout = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="col-span-2 order-last md:order-first space-y-8">
        <div>
          <h2 className="font-bold text-3xl">About</h2>
          <p className="mt-2 ms-2 text-lg" style={{ color: secondary }}>
            {profile.summary}
          </p>
        </div>

        <div>
          <h2 className="font-bold text-3xl">Skills</h2>
          <div className="mt-2 flex gap-x-2 gap-y-1 flex-wrap">
            {profile.skills.map((skill: string) => (
              <Chip key={skill} label={skill} variant="outlined" />
            ))}
            {profile.skills.length === 0 && (
              <p className="ms-2 text-lg" style={{ color: secondary }}>
                No skills
              </p>
            )}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-3xl">Languages</h2>
          <div className="mt-2 flex gap-x-2 gap-y-1 flex-wrap">
            {profile.languages.map((language: string) => (
              <Chip key={language} label={language} variant="outlined" />
            ))}
            {profile.languages.length === 0 && (
              <p className="ms-2 text-lg" style={{ color: secondary }}>
                No languages
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="col-span-1">
        <div
          className="w-fit m-auto mb-7 border p-4 shadow-md rounded-md"
          style={{ borderColor: secondary }}
        >
          <p className="text-lg font-inter flex gap-5 items-center mb-5">
            <ManageAccountsIcon sx={{ fontSize: 30 }} />
            {`${
              profile.yearsOfExperience > 0
                ? `${profile.yearsOfExperience}+ years of experience`
                : "Fresh Graduate"
            }`}
          </p>

          <Divider />

          <div className="flex items-center gap-5 my-2">
            <EmailIcon sx={{ fontSize: 30 }} />

            <div>
              <p className="font-bold">
                <Link to={`mailto:${user.email}`}>{user.email}</Link>
              </p>
              <span className="text-sm" style={{ color: secondary }}>
                Contact Email
              </span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <PhoneIcon sx={{ fontSize: 30 }} />
            <div>
              <p className="font-bold">{user.phoneNumber}</p>
              <span className="text-sm" style={{ color: secondary }}>
                Phone
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExperiences = (
    <>
      <h2 className="font-bold text-3xl mb-9">Work Experience</h2>

      <div className="space-y-5 w-full lg:w-2/3">
        {profile.experiences.map((experience: any) => (
          <div
            key={experience.id}
            className="border py-3 px-5 rounded-lg shadow-lg"
            style={{ borderColor: secondary }}
          >
            <FlexBetween>
              <div>
                <h3 className="text-2xl font-inter font-bold">
                  {experience.jobTitle}
                </h3>
                <span>{experience.companyName}</span>
              </div>

              <p className="font-semibold">
                {format(experience.startDate, "MMM yyyy")}
                {experience.endDate &&
                  ` - ${format(experience.endDate, "MMM yyyy")}`}
              </p>
            </FlexBetween>

            <p className="mt-3" style={{ color: secondary }}>
              {experience.description}
            </p>
          </div>
        ))}
        {profile.experiences.length === 0 && (
          <p className="ms-2 text-lg" style={{ color: secondary }}>
            No work experiences
          </p>
        )}
      </div>
    </>
  );

  const renderEducations = (
    <>
      <div>
        <h2 className="font-bold text-3xl mb-9">Education</h2>

        <div className="space-y-5 w-full lg:w-2/3">
          {profile.educations.map((education: any) => (
            <div
              key={education.id}
              className="border py-3 px-5 rounded-lg shadow-lg"
              style={{ borderColor: secondary }}
            >
              <FlexBetween>
                <div>
                  <h3 className="text-2xl font-inter font-bold">
                    {education.schoolName}
                  </h3>
                  <span>{education.degree}</span>
                </div>

                <p className="font-semibold">
                  {format(education.startDate, "MMM yyyy")}
                  {education.endDate &&
                    ` - ${format(education.endDate, "MMM yyyy")}`}
                </p>
              </FlexBetween>

              <p className="mt-3" style={{ color: secondary }}>
                {education.description}
              </p>
            </div>
          ))}
          {profile.educations.length === 0 && (
            <p className="ms-2 text-lg" style={{ color: secondary }}>
              No educations
            </p>
          )}
        </div>
      </div>

      <Divider sx={{ my: 3 }} />

      <div>
        <h2 className="font-bold text-3xl mb-9">Certificates</h2>

        <div className="space-y-5 w-full lg:w-2/3">
          {profile.certificates.map((certificate: any) => (
            <div
              key={certificate.id}
              className="border py-3 px-5 rounded-lg shadow-lg"
              style={{ borderColor: secondary }}
            >
              <FlexBetween gap={2}>
                <div>
                  <h3 className="text-2xl font-inter font-bold">
                    {certificate.title}
                  </h3>
                  <span>{certificate.authority}</span>
                  <p className="text-sm" style={{ color: secondary }}>
                    Issued {format(certificate.issuedAt, "MMM yyyy")}
                    {certificate.validUntil &&
                      ` - Expires ${format(
                        certificate.validUntil,
                        "MMM yyyy"
                      )}`}
                  </p>
                </div>

                <Button className="flex items-center gap-2" variant="outlined">
                  <Link to={certificate.url} target="_blank">
                    Show credential
                  </Link>
                  <OpenInNewIcon />
                </Button>
              </FlexBetween>
            </div>
          ))}
          {profile.certificates.length === 0 && (
            <p className="ms-2 text-lg" style={{ color: secondary }}>
              No certificates
            </p>
          )}
        </div>
      </div>
    </>
  );

  const renderProjects = (
    <>
      <h2 className="font-bold text-3xl mb-9">Projects</h2>

      <div className="space-y-5 w-full lg:w-2/3">
        {profile.projects.map((project: any) => (
          <div
            key={project.id}
            className="border py-3 px-5 rounded-lg shadow-lg"
            style={{ borderColor: secondary }}
          >
            <FlexBetween gap={2}>
              <div>
                <div>
                  <h3 className="text-2xl font-inter font-bold">
                    {project.name}
                  </h3>
                  <div className="mt-2 flex gap-x-2 gap-y-1 flex-wrap">
                    {project.skills.map((skill: string) => (
                      <Chip
                        key={skill}
                        label={skill}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </div>
                </div>

                <p className="mt-3" style={{ color: secondary }}>
                  {project.description}
                </p>
              </div>

              <Button className="flex items-center gap-2" variant="outlined">
                <Link to={project.url} target="_blank">
                  Project Repo
                </Link>
                <OpenInNewIcon />
              </Button>
            </FlexBetween>
          </div>
        ))}
        {profile.projects.length === 0 && (
          <p className="ms-2 text-lg" style={{ color: secondary }}>
            No projects
          </p>
        )}
      </div>
    </>
  );

  const renderTabs = (
    <TabContext value={currentTab}>
      <div className="border-y" style={{ borderColor: primary }}>
        <Container>
          <TabList onChange={handleChange}>
            <Tab label="About" value={ProfilePageTabs.ABOUT} />
            <Tab label="Experiences" value={ProfilePageTabs.EXPERIENCES} />
            <Tab label="Educations" value={ProfilePageTabs.EDUCATIONS} />
            <Tab label="Projects" value={ProfilePageTabs.PROJECTS} />
          </TabList>
        </Container>
      </div>

      <Container className="mb-52">
        <TabPanel value={ProfilePageTabs.ABOUT}>{renderAbout}</TabPanel>
        <TabPanel value={ProfilePageTabs.EXPERIENCES}>
          {renderExperiences}
        </TabPanel>
        <TabPanel value={ProfilePageTabs.EDUCATIONS}>
          {renderEducations}
        </TabPanel>
        <TabPanel value={ProfilePageTabs.PROJECTS}>{renderProjects}</TabPanel>
      </Container>
    </TabContext>
  );

  const renderSnackBar = (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={() => setSnackbarOpen(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={() => setSnackbarOpen(false)}
        severity={snackbarType as "success" | "error"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );

  const renderApplyModal = (
    <Modal open={applyModalOpen} onClose={() => setApplyModalOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" mb={3}>
          Create Cover Letter for the following company
        </Typography>

        <TextField
          fullWidth
          name="companyName"
          label="Company Name"
          variant="outlined"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <Button
          aria-label="create-cover-letter"
          variant="contained"
          color="success"
          sx={{ mt: 3, display: "block", ml: "auto" }}
          onClick={handleCreateCoverLetter}
          disabled={!companyName || loading}
        >
          Create
        </Button>
      </Box>
    </Modal>
  );

  const renderUploadCVModal = (
    <Modal open={uploadCVModalOpen} onClose={() => setUploadCVModalOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" mb={3}>
          Upload your CV
        </Typography>

        <Box
          {...getRootProps({ className: "dropzone" })}
          p={3}
          border="1px dashed grey"
          borderRadius={2}
          textAlign="center"
          my={2}
        >
          <input {...getInputProps()} disabled={loading} />
          <Typography>
            {acceptedFiles.length > 0
              ? acceptedFiles[0].name
              : "Drop your CV here or click to upload (PDF only)"}
          </Typography>
        </Box>

        <Button
          aria-label="upload-cv"
          variant="contained"
          color="success"
          sx={{ mt: 3, display: "block", ml: "auto" }}
          onClick={handleUploadCV}
          disabled={!acceptedFiles.length || loading}
        >
          Upload
        </Button>
      </Box>
    </Modal>
  );

  return (
    <>
      <Container>{renderHeader}</Container>

      {renderTabs}

      {renderSnackBar}

      {renderApplyModal}

      {renderUploadCVModal}
    </>
  );
}

export default UserProfileDetails;
