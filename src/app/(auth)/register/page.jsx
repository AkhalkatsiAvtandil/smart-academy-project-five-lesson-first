"use client";
import Link from "next/link";
import styles from "./page.module.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const userSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(4, "First name must be at least 4 characters")
    .max(20, "First name must be at most 20 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(4, "Last name must be at least 4 characters")
    .max(20, "Last name must be at most 20 characters"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .min(13, "Age must be at least 13")
    .max(120, "Age must be at most 120"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be at most 12 characters"),
  phone: yup
    .string()
    .nullable()
    .min(10, "Phone number must be at least 10 digits")
    .max(100, "Phone number must be at most 100 digits"),
});

const page = () => {
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(userSchema) });

  const handleUserRegistration = (data) => {
    console.log("User registration data:", data);
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Register Page</h2>
      <form
        className={styles.form}
        onSubmit={handleSubmit(handleUserRegistration)}
      >
        <div className={styles.fields}>
          <label className={styles.label} htmlFor="firstName">
            First Name:
          </label>
          <input
            className={styles.input}
            type="text"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className={styles.error}>{errors.firstName.message}</p>
          )}

          <label className={styles.label} htmlFor="lastName">
            Last Name:
          </label>
          <input
            className={styles.input}
            type="text"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className={styles.error}>{errors.lastName.message}</p>
          )}

          <label className={styles.label} htmlFor="age">
            Age:
          </label>
          <input className={styles.input} type="number" {...register("age")} />
          {errors.age && <p className={styles.error}>{errors.age.message}</p>}

          <label className={styles.label} htmlFor="email">
            Email:
          </label>
          <input className={styles.input} type="email" {...register("email")} />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}

          <label className={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            className={styles.input}
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}

          <label className={styles.label} htmlFor="phone">
            Phone:
          </label>
          <input className={styles.input} type="tel" {...register("phone")} />
          {errors.phone && (
            <p className={styles.error}>{errors.phone.message}</p>
          )}
        </div>
        <button className={styles.submitButton} type="submit">
          Register
        </button>
      </form>
      <Link href="/login" className={styles.loginLink}>
        Already have an account? Sign In
      </Link>
    </div>
  );
};

export default page;
