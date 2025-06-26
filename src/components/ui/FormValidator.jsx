import React, { useState } from 'react';
import { validateForm } from '../../utils/validators';

const FormValidator = ({ 
  initialValues = {}, 
  validationRules = {}, 
  onSubmit,
  children 
}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setValues({
      ...values,
      [name]: fieldValue
    });

    // Clear error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    
    setTouched({
      ...touched,
      [name]: true
    });
    
    // Validate field on blur
    if (validationRules[name]) {
      const fieldRules = Array.isArray(validationRules[name]) 
        ? validationRules[name] 
        : [validationRules[name]];
      
      for (const rule of fieldRules) {
        const error = rule(values[name]);
        if (error) {
          setErrors({
            ...errors,
            [name]: error
          });
          break;
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(validationRules).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    
    setTouched(allTouched);
    
    // Validate all fields
    const { isValid, errors: validationErrors } = validateForm(values, validationRules);
    
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
      // Could set form-level errors here
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form to initial values
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  // Set form values programmatically
  const setFormValues = (newValues) => {
    setValues({
      ...values,
      ...newValues
    });
  };

  return children({
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFormValues
  });
};

export default FormValidator;