import { Formik, Form } from "formik";
import * as Yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Button, Box } from "@mui/material";
import AdvancedPhoneInput from "./AdvancedPhoneInput.jsx";




// Validation Schema using Yup
const validationSchema = Yup.object().shape({
    phone: Yup.string()
        .required("Phone number is required")
        .test("is-valid-phone", "Invalid phone number", (value) => {
            const phoneNumber = parsePhoneNumberFromString(value || "", "US");
            return phoneNumber?.isValid() || false;
        }),
});

const PhoneValidationForm = () => {
    const initialValues = { phone: "" };

    const onSubmit = (values) => {
        console.log("Form values:", values);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched, handleChange, handleSubmit }) => {
                const handleCustomChange = (name, value) => {
                    handleChange({
                        target: { name, value }
                    });
                };
                return (
                <Form onSubmit={handleSubmit}>

                    <Box mb={2}>
                        <AdvancedPhoneInput
                            name="phone"
                            label="Phone"
                            fullWidth
                            onChange={(e)=>handleCustomChange("phone",e)}
                            error={touched.phone && Boolean(errors.phone)}
                            helperText={touched.phone && errors.phone}
                        />
                    </Box>

                    <Box>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Box>
                </Form>
                )
            }}
        </Formik>
    );
};

export default PhoneValidationForm;