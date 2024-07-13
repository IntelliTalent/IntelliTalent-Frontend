import React, { useState, ChangeEvent } from "react";
import {
  TextField,
  Button,
  IconButton,
  Modal,
  Box,
  Container,
  Typography,
  Stack,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { submitFields } from "../../api/profiles";

export default function EditAutoFillExtension({
  fields,
}: {
  fields: Record<string, string | null>;
}) {
  const [formFields, setFormFields] =
    useState<Record<string, string | null>>(fields);
  const [modalOpen, setModalOpen] = useState(false);
  const [newFieldKey, setNewFieldKey] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [open, setOpen] = useState(false);

  const handleFieldChange = (key: string, value: string) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [key]: value,
    }));
    setIsDirty(true); // Mark the form as dirty when any field is changed
  };

  const handleDeleteField = (key: string) => {
    setFormFields((prevFields) => {
      const { [key]: _, ...rest } = prevFields;
      return rest;
    });
    setIsDirty(true); // Mark the form as dirty when a field is deleted
  };

  const handleAddField = () => {
    if (newFieldKey && newFieldValue) {
      setFormFields((prevFields) => ({
        ...prevFields,
        [newFieldKey]: newFieldValue,
      }));
      setNewFieldKey("");
      setNewFieldValue("");
      setModalOpen(false);
      setIsDirty(true); // Mark the form as dirty when a new field is added
    }
  };

  const handleSubmit = async () => {
    try {
      await submitFields(formFields);
      setIsDirty(false); // Reset the dirty state after successful submission
      setOpen(true);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  const allFieldsFilled = Object.values(formFields).every(
    (value) => value !== ""
  );

  const hasFields = Object.keys(formFields).length > 0;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography component="h1" variant="h4" fontWeight={700} mb={4}>
        Edit AutoFill Extension Fields
      </Typography>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Container maxWidth="md">
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          mb={4}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setModalOpen(true)}
          >
            Add Field
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            disabled={!allFieldsFilled || !isDirty} // Disable if the form is not dirty or not all fields are filled
          >
            Submit
          </Button>
        </Stack>

        <Box>
          {hasFields ? (
            <Grid container spacing={4}>
              {Object.entries(formFields).map(
                ([key, value]) =>
                  value !== null && (
                    <Grid item key={key} xs={12} md={6}>
                      <Stack direction="row" alignItems="center">
                        <TextField
                          label={key}
                          value={value === null ? "" : value}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleFieldChange(key, e.target.value)
                          }
                          variant="outlined"
                          aria-label={`field-${key}`}
                          fullWidth
                        />
                        <IconButton onClick={() => handleDeleteField(key)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Stack>
                    </Grid>
                  )
              )}
            </Grid>
          ) : (
            <Typography
              variant="body1"
              color="textSecondary"
              align="center"
              mt={4}
            >
              No fields available. Please add a new field.
            </Typography>
          )}
        </Box>

        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Box
            display="flex"
            flexDirection="column"
            p={3}
            bgcolor="background.paper"
            boxShadow={3}
            borderRadius={2}
            style={{ margin: "auto", marginTop: "20vh", maxWidth: "400px" }}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              Add New Field
            </Typography>

            <TextField
              label="Key"
              name="key"
              value={newFieldKey}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewFieldKey(e.target.value)
              }
              variant="outlined"
              style={{ marginBottom: 16 }}
            />
            <TextField
              label="Value"
              name="value"
              value={newFieldValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewFieldValue(e.target.value)
              }
              variant="outlined"
              style={{ marginBottom: 16 }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddField}
              disabled={!newFieldKey || !newFieldValue}
              aria-label="add-field"
            >
              Add
            </Button>
          </Box>
        </Modal>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Fields updated successfully
          </Alert>
        </Snackbar>
      </Container>
    </Container>
  );
}
