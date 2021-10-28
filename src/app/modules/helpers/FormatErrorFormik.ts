export const FormatErrorFormik = (backendErrors: string[]) => {
    let errors: any = {};

    for (let error in backendErrors) {

        errors[error] = backendErrors[error][0];
    }

    return errors;
};
