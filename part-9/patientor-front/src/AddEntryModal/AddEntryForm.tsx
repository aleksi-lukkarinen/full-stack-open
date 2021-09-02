import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, EntryTypeOption, DiagnosisSelection, NumberField } from "./FormField";
import { Entry, EntryType, HealthCheckRating } from "../types";
import { assertNever } from "../utils";
import { useStateValue } from "../state";



export interface EntryFormValues {
  type: Entry["type"],
  date: string,
  specialist: string,
  description: string,
  diagnosisCodes?: string[],
  healthCheckRating: HealthCheckRating,
  employerName: string,
  sickLeaveStartDate: string,
  sickLeaveEndDate: string,
  dischargeDate: string,
  dischargeCriteria: string,
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "Health Check" },
  { value: EntryType.OccupationalHealthcare, label: "Occupational Healthcare" },
  { value: EntryType.Hospital, label: "Hospital Stay" }
];

const initialValues: EntryFormValues = {
  type: EntryType.HealthCheck,
  date: "",
  specialist: "",
  description: "",
  diagnosisCodes: undefined,
  healthCheckRating: HealthCheckRating.Healthy,
  employerName: "",
  sickLeaveStartDate: "",
  sickLeaveEndDate: "",
  dischargeDate: "",
  dischargeCriteria: "",
};

const validator = (values: EntryFormValues) => {
  const requiredError = "Field is required";
  const errors: { [field: string]: string } = {};

  if (!values.date) {
    errors.date = requiredError;
  }

  if (!values.specialist) {
    errors.specialist = requiredError;
  }

  if (!values.description) {
    errors.description = requiredError;
  }

  switch (values.type) {
    case "HealthCheck":
      if (![0, 1, 2, 3].includes(values.healthCheckRating)) {
        errors.healthCheckRating =
          "The health check rating must be 0, 1, 2, or 3.";
      }
      break;

    case "OccupationalHealthcare":
      if (!values.employerName) {
        errors.employerName = requiredError;
      }

      if (values.sickLeaveStartDate || values.sickLeaveEndDate) {
        if (!values.sickLeaveStartDate) {
          errors.sickLeaveStartDate = requiredError;
        }
        if (!values.sickLeaveEndDate) {
          errors.sickLeaveEndDate = requiredError;
        }
      }
      break;

    case "Hospital":
      if (!values.dischargeDate) {
        errors.dischargeDate = requiredError;
      }
      if (!values.dischargeCriteria) {
        errors.dischargeCriteria = requiredError;
      }
      break;

    default:
      assertNever(values.type);
  }

  return errors;
};


interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {
  const [entryType, setEntryType] = useState("HealthCheck");
  const [{ diagnoses }] = useStateValue();

  const entryTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: (field: string, value: string, shouldValidate?: boolean | undefined) => void) => {

    const entryType = event.target.value;
    setEntryType(entryType);
    setFieldValue("type", entryType, true);
  };

  const extraFields = (): JSX.Element => {
    const type = entryType as Entry["type"];
    switch (type) {
      case "HealthCheck":
        return (
          <>
            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3} />
          </>
        );
      case "OccupationalHealthcare":
        return (
          <>
            <Field
              label="Patient's Employer"
              placeholder=""
              name="employerName"
              component={TextField} />
            <Field
              label="Sick Leave: Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeaveStartDate"
              component={TextField} />
            <Field
              label="Sick Leave: End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeaveEndDate"
              component={TextField} />
          </>
        );
      case "Hospital":
        return (
          <>
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="dischargeDate"
              component={TextField} />
            <Field
              label="Discharge Criteria"
              placeholder=""
              name="dischargeCriteria"
              component={TextField} />
          </>
        );
      default:
        return assertNever(type);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validator}>
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Entry Type"
              name="entryType"
              options={entryTypeOptions}
              onChange={(event) => entryTypeChange(event, setFieldValue)} />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField} />
            <Field
              label="Specialist"
              placeholder="Title Firstname Lastname"
              name="specialist"
              component={TextField} />
            <Field
              label="Description"
              placeholder=""
              name="description"
              component={TextField} />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)} />
            {extraFields()}

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}>
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
