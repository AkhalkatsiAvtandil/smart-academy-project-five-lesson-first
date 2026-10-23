"use client";

const page = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div>
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <br></br>
          <input type="text" placeholder="username" />
          <label htmlFor="email">Email:</label>
          <br></br>
          <input type="email" placeholder="email" />
        </div>
      </form>
    </div>
  );
};

export default page;
