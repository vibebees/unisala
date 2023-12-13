import React from "react"
import ScholarshipCard from "features/search/atoms/ScholarshipCard"

const dummyScholarship = {
  university: "University of Arkansas at Little Rock",
  scholarshipName: "New Arkansan Non-Resident Tuition Award",
  level: "Undergraduate",
  gpaRequirement: "Minimum 3.0 cumulative GPA",
  actRequirement: "Minimum 20",
  satRequirement: "Minimum 1030",
  scholarshipAmount: "90% of non-resident tuition per year",
  imageUrl:
    "https://unisala-university-images.s3.amazonaws.com/Northern%20Kentucky%20University_157447-4.jpg?AWSAccessKeyId=ASIAUVJSKU37WOAPIM5F&Expires=1702374216&Signature=3j9YpkIB%2FAr5Qu33BuYXp41FxFU%3D&x-amz-security-token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRzBFAiAeOyv4fym%2F1200GM%2Br%2F5MynMFVoXoq3xAtLJtCDh6DygIhAKA8dMsjfhluPVTmDT5WmXzG1isObYfZXWVpE095nmtIKr8FCCkQARoMMzIwNjE3NDkwMTc1Igxdu8v6wmAHQI2hAp0qnAVwqDruZp9T%2Fv7p0s5XfYYj5JW46Y7UZ6%2BkuRorgYKL7Vem36UuZVSxiJUhvNSLBGqk7plhAa5QCiCBdIlnjlP2ihEYY3TYkLUs9mfYQrriShQnU9YL4mQ6TQr6ezLX0ydU%2BGwFEKzaRZgY2IMY2ZeDBCHsQc33b0yp8IT8ZSIZ3U8CO3qk3sGTL9b%2FiwyHhXvXLH%2Fm9fDmDgYUgbF0sudIt642zFdvV4Iilrc3cTfOHrGYNXzL3qq6g4%2FI44aL9ZvAY4l%2BnL6oOY1cIVYrRuE1jke2zmMOB2oSaJo7QNvycdH%2BHH1j%2FSvE6XnwyLaZzUEU26hII2OEzLqLIyjwJgvt5cP%2FpCW%2B9tble%2Bm3c8GjeC5CBqRxcfuLHIepJTD2TB6d4dyrRkKdnWHaK9Jd6N9S6gGNi1gFZHkkYXNqxCYOuKzSeY8kRueGnA74GR0sl7YeKx0qQS86MR0gBF0Ke69E%2BWP8A6%2FI68NQ1TfFUZe3fE3gCuAOpaGQDfxPPE5tTUXMetAb88Dsb3xt75yfLTGWTLZ64N8m9GDPoYnKFIcxK2w%2FVTcDEyeKdANZFHmEVRMASx9xpu3mSIzWQgCtpo%2Boay7EhJBzQrH1IcmQn4Z543C%2FwWum3TlOjmXKvQ45ntmbtr3jHSTtkzBn%2FoFLL7saE7GvtKaH%2FDoQaTmjlrHQ9gvVqVlHmygqDSyji546fJIbMAAH07YdUW2FWVs3FLj%2BOVB9qGm6adDMS4%2FEj4x6ZFTr0a0jqrtxBl39cmmoC%2BYpcVdajYxutjKeOhk1ejSnaDkHYFfXpv0AJ2KU%2Fao0hLS48C%2FhMQO33VBWKDOHEQl%2FA5gFOkgCpSSVB%2B0msGMbSEw0ixx9fuCIz2yatpxmL73XWdFqOsbG%2Bdd2tzDlp%2BCrBjqxASliXczrqoIbqBdJjM2RKSgtxAG5RV1m5oHr2Tqs1GcS3FfQ5Q6NckZ0oivfmZ8d16xg8yq1YjIz1RcYu2iQto3s5nkXKv88o5ng0ygjKMjctexRFrcmlKiJVPpfbtoX1q5D%2BueEAQaaQ1P2mKkevZ7G7fMOS3Lc%2F%2B9ZR9HOL6hagNwfpnrYFWYREZ7tOIrlQFornQl%2BZbKvcCxf8%2Fg28WgVp6UJRBOoWD0X3AJ7kK0XEw%3D%3D" // Replace with a real image URL
}

const ScholarshipResults = () => {
  return (
    <div>
      <ScholarshipCard scholarship={dummyScholarship} />
      <ScholarshipCard scholarship={dummyScholarship} />
      <ScholarshipCard scholarship={dummyScholarship} />
      <ScholarshipCard scholarship={dummyScholarship} />
      <ScholarshipCard scholarship={dummyScholarship} />
      <ScholarshipCard scholarship={dummyScholarship} />
    </div>
  )
}

export default ScholarshipResults
