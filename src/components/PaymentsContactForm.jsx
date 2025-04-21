import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaCheck, FaArrowRight, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import { Form, Button, Alert } from 'react-bootstrap';

const PaymentsContactForm = ({ onFocusChange, onProgressChange }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    package: 'standard'
  });
  const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [formProgress, setFormProgress] = useState(0);

  // Calculate form progress
  useEffect(() => {
    const requiredFields = ['name', 'email', 'phone', 'subject', 'message'];
    const filledFields = requiredFields.filter(field => formData[field].trim() !== '');
    const progress = Math.round((filledFields.length / requiredFields.length) * 100);
    setFormProgress(progress);
    
    if (onProgressChange) {
      onProgressChange(progress);
    }
  }, [formData, onProgressChange]);

  // Handle field focus for System 2 engagement
  const handleFieldFocus = (fieldName, focused) => {
    setActiveField(focused ? fieldName : null);
    if (onFocusChange) {
      onFocusChange(focused);
    }
  };

  // Validate form fields
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? t('contact.errors.nameRequired') : '';
      case 'email':
        return value.trim() === '' 
          ? t('contact.errors.emailRequired') 
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
            ? t('contact.errors.emailInvalid') 
            : '';
      case 'phone':
        return value.trim() === '' ? t('contact.errors.phoneRequired') : '';
      case 'subject':
        return value.trim() === '' ? t('contact.errors.subjectRequired') : '';
      case 'message':
        return value.trim() === '' ? t('contact.errors.messageRequired') : '';
      default:
        return '';
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    
    // If no errors, submit form
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Reset form after success
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            package: 'standard'
          });
          setFormProgress(0);
          if (onProgressChange) {
            onProgressChange(0);
          }
        }, 3000);
      }, 1500);
    }
  };

  // Field variants for animations
  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
    };

    return (
    <div className="contact-form-container">
      {submitSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="success-message"
        >
          <Alert variant="success" className="d-flex align-items-center">
            <FaCheck className="me-2" />
            <div>
              <h4 className="alert-heading">{t('contact.successTitle')}</h4>
              <p>{t('contact.successMessage')}</p>
            </div>
          </Alert>
        </motion.div>
      ) : (
        <Form onSubmit={handleSubmit} className="contact-form">
          {/* Progress indicator */}
          <div className="mb-4">
            <div className="d-flex justify-content-between mb-2">
              <small className="text-muted">{t('contact.formProgress')}</small>
              <small className="text-muted">{formProgress}%</small>
            </div>
            <div className="progress" style={{ height: '8px' }}>
              <motion.div
                className="progress-bar bg-success"
                role="progressbar"
                initial={{ width: 0 }}
                animate={{ width: `${formProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            </div>

          {/* Name field */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <Form.Group className="mb-3">
              <Form.Label>{t('contact.name')} *</Form.Label>
              <Form.Control
                    type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFieldFocus('name', true)}
                onBlur={() => handleFieldFocus('name', false)}
                isInvalid={!!errors.name}
                className={activeField === 'name' ? 'field-focused' : ''}
              />
              {errors.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              )}
              {activeField === 'name' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="field-tip"
                >
                  <FaInfoCircle className="me-1" />
                  <small>{t('contact.nameTip')}</small>
                </motion.div>
              )}
            </Form.Group>
          </motion.div>

          {/* Email field */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Form.Group className="mb-3">
              <Form.Label>{t('contact.email')} *</Form.Label>
              <Form.Control
                    type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFieldFocus('email', true)}
                onBlur={() => handleFieldFocus('email', false)}
                isInvalid={!!errors.email}
                className={activeField === 'email' ? 'field-focused' : ''}
              />
              {errors.email && (
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              )}
              {activeField === 'email' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="field-tip"
                >
                  <FaInfoCircle className="me-1" />
                  <small>{t('contact.emailTip')}</small>
                </motion.div>
              )}
            </Form.Group>
          </motion.div>

          {/* Phone field */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <Form.Group className="mb-3">
              <Form.Label>{t('contact.phone')} *</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => handleFieldFocus('phone', true)}
                onBlur={() => handleFieldFocus('phone', false)}
                isInvalid={!!errors.phone}
                className={activeField === 'phone' ? 'field-focused' : ''}
              />
              {errors.phone && (
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              )}
              {activeField === 'phone' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="field-tip"
                >
                  <FaInfoCircle className="me-1" />
                  <small>{t('contact.phoneTip')}</small>
                </motion.div>
              )}
            </Form.Group>
          </motion.div>

          {/* Subject field */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <Form.Group className="mb-3">
              <Form.Label>{t('contact.subject')} *</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => handleFieldFocus('subject', true)}
                onBlur={() => handleFieldFocus('subject', false)}
                isInvalid={!!errors.subject}
                className={activeField === 'subject' ? 'field-focused' : ''}
              />
              {errors.subject && (
                <Form.Control.Feedback type="invalid">
                  {errors.subject}
                </Form.Control.Feedback>
              )}
              {activeField === 'subject' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="field-tip"
                >
                  <FaInfoCircle className="me-1" />
                  <small>{t('contact.subjectTip')}</small>
                </motion.div>
              )}
            </Form.Group>
          </motion.div>

          {/* Package selection - System 2 decision */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <Form.Group className="mb-3">
              <Form.Label>{t('contact.package')}</Form.Label>
              <div className="package-options">
                {['basic', 'standard', 'premium'].map((pkg) => (
                  <motion.div
                    key={pkg}
                    className={`package-option ${formData.package === pkg ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, package: pkg }))}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="package-radio">
                      {formData.package === pkg && <FaCheck />}
                    </div>
                    <div className="package-label">
                      {t(`contact.packages.${pkg}`)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Form.Group>
          </motion.div>

          {/* Message field */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <Form.Group className="mb-4">
              <Form.Label>{t('contact.message')} *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFieldFocus('message', true)}
                onBlur={() => handleFieldFocus('message', false)}
                isInvalid={!!errors.message}
                className={activeField === 'message' ? 'field-focused' : ''}
              />
              {errors.message && (
                <Form.Control.Feedback type="invalid">
                  {errors.message}
                </Form.Control.Feedback>
              )}
              {activeField === 'message' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="field-tip"
                >
                  <FaInfoCircle className="me-1" />
                  <small>{t('contact.messageTip')}</small>
                </motion.div>
              )}
            </Form.Group>
          </motion.div>

          {/* Submit button */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
          >
            <Button
              variant="primary"
              type="submit"
              className="w-100 submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>{t('contact.submitting')}</span>
              ) : (
                <span className="d-flex align-items-center justify-content-center">
                  {t('contact.submit')} <FaArrowRight className="ms-2" />
                </span>
              )}
            </Button>
          </motion.div>

          {/* Form validation summary */}
          {Object.keys(errors).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3"
            >
              <Alert variant="danger" className="d-flex align-items-center">
                <FaExclamationTriangle className="me-2" />
                <div>
                  <strong>{t('contact.validationError')}</strong>
                  <p className="mb-0">{t('contact.pleaseCheckFields')}</p>
                </div>
              </Alert>
            </motion.div>
          )}
        </Form>
            )}
        </div>
    );
};

export default PaymentsContactForm;