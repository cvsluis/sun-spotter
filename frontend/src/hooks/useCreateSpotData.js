import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function useCreateSpotData() {
  // for redirect after form submission
  const navigate = useNavigate();

  // FORM DATA STATE
  const [formData, setFormData] = useState({
    spot: { city: 'Victoria', province: 'BC', country: 'Canada', lat: '', lng: '' },
    visit: { chosenName: '', time_stamp: '', description: '', rating: 0, image: '' },
    labels: []
  });

  const [imagePreview, setImagePreview] = useState('');
  const [marker, setMarker] = useState([{}]);

  // map state handler
  const onMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setMarker([{ lat: lat, lng: lng }]);
    setFormData(prev => ({ ...prev, spot: { ...prev.spot, lat: lat, lng: lng } }));
  };

  // label state handlers
  const isClicked = label => formData.labels.filter(labelObject => labelObject.label_id === label.id).length > 0;
  const handleLabelClick = (e) => {
    const labelId = Number(e.target.id);
    const label = { label_id: labelId };
    const labelIsClicked = formData.labels.filter(labelObject => labelObject.label_id === labelId).length > 0;

    if (labelIsClicked) {
      setFormData(prev => ({ ...prev, labels: formData.labels.filter(labelObject => labelObject.label_id !== labelId) }));
    } else {
      setFormData(prev => ({ ...prev, labels: [...prev.labels, label] }));
    }
  };

  // form input state handler
  const handleFormChange = (event) => {
    const name = event.target.name;
    name === 'chosenName' && setFormData(prev => ({ ...prev, spot: { ...prev.spot, name: event.target.value } }));
    setFormData(prev => ({ ...prev, visit: { ...prev.visit, [name]: event.target.value } }));
  };

  // file input state handler
  const handleFileInput = (e) => {
    if (imagePreview) {
      setFormData(prev => ({ ...prev, visit: { ...prev.visit, image: '' } }));
      setImagePreview('');
    } else {
      setFormData(prev => ({ ...prev, visit: { ...prev.visit, image: e.target.files[0] } }));
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // rating input state handler
  const handleRatingInput = (e) => {
    setFormData(prev => ({ ...prev, visit: { ...prev.visit, rating: e } }));
  };

  // data submit handler
  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append('file', formData.visit.image);
      data.append('data', JSON.stringify(formData));
      await fetch('http://localhost:8080/api/spots', {
        method: 'POST',
        body: data
      });
      navigate("/spots/");
    } catch (error) {
      console.error('Sorry, we could not complete your request: ', error);
      throw error;
    }
  };

  // FORM VALIDATION
  const [activateNavButton, setActivateNavButton] = useState(false);
  // for each modal, check if input has been set
  const validateInput = () => {
    if (modal === 0 && formData.spot.lat !== '') {
      setActivateNavButton(true);
      return;
    }
    if (modal === 1 &&
      formData.visit.chosenName !== '' &&
      formData.visit.time_stamp !== '' &&
      formData.visit.description !== '' &&
      formData.visit.rating !== 0) {
      setActivateNavButton(true);
      return;
    }
    if (modal === 2 && formData.visit.image !== '') {
      setActivateNavButton(true);
      return;
    }
    setActivateNavButton(false);
  };

  // MODAL STATE
  const [modal, setModal] = useState(0);

  const handleBackClick = () => {
    if (modal === 0) {
      navigate("/spots/");
    } else {
      setModal(prev => prev - 1);
    }
  };

  const handleForwardClick = () => {
    if (modal === 2) {
      handleSubmit();
    } else {
      setModal(prev => prev + 1);
    }
  };

  // check for empty inputs after every time form data or modal changes
  useEffect(() => {
    validateInput();
  }, [formData, modal]);

  return [
    formData,
    imagePreview,
    marker,
    onMapClick,
    isClicked,
    handleLabelClick,
    handleFormChange,
    handleFileInput,
    handleRatingInput,
    activateNavButton,
    modal,
    handleBackClick,
    handleForwardClick];
}