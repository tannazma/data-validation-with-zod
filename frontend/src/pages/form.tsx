const Form = () => {
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
   
      // get the data
      const serviceChoice = event.currentTarget.serviceChoice.value;
      const vehicleColor = event.currentTarget.vehicleColor.value;
      const rentalDays = event.currentTarget.rentalDays.value;
      const experience = event.currentTarget.experience.value;
      const emotionChoice = event.currentTarget.emotionChoice.value;
   
      console.log(
        serviceChoice,
        vehicleColor,
        rentalDays,
        experience,
        emotionChoice
      );
    };
   
    return (
      <main>
        <h1>Customer feedback form</h1>
        <form className="vertical-form" onSubmit={handleFormSubmit}>
          <label htmlFor="service-choice">What service did you use?</label>
          <select id="service-choice" name="serviceChoice">
            <option>🚴 Bike rental</option>
            <option>🚗 Car rental</option>
            <option>🚁 Helicopter rental</option>
            <option>🚀 Spaceship rental</option>
          </select>
   
          <label htmlFor="vehicle-color">What color was your vehicle?</label>
          <input type="color" id="vehicle-color" name="vehicleColor"></input>
   
          <label htmlFor="rental-days">How many days was your rental?</label>
          <input type="number" id="rental-days" name="rentalDays"></input>
   
          <label htmlFor="experience">
            How would you describe the experience?
          </label>
          <textarea
            id="experience"
            name="experience"
            placeholder="My experience was..."
          ></textarea>
   
          <label htmlFor="emoition-choice">
            What emotion did you feel during the rental period?
          </label>
          <select id="emotion-choice" name="emotionChoice">
            <option>😡</option>
            <option>😐</option>
            <option>🙂</option>
            <option>😁</option>
          </select>
   
          <button type="submit">Submit</button>
        </form>
      </main>
    );
  };
   
  export default Form;