"use client";

import React, { useState, useEffect } from "react";
import InquiryForm from "./InquiryForm";

interface InquiryPopupProps {
  serviceName: string;
  serviceSlug: string;
}

const InquiryPopup: React.FC<InquiryPopupProps> = ({ serviceName, serviceSlug }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <InquiryForm
      isOpen={isOpen}
      onClose={handleClose}
      serviceName={serviceName}
      serviceSlug={serviceSlug}
    />
  );
};

export default InquiryPopup;
