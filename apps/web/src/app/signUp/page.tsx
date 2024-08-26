'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [userType, setUserType] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [isValid, setIsValid] = useState(true);

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Basic validation
    if (
      !email ||
      !password ||
      !repeatPassword ||
      !firstName ||
      !lastName ||
      !phone ||
      !company ||
      !userType ||
      (userType === 'Music Experience' && !referralCode) || // Check referral code if userType is "Music Experience"
      password !== repeatPassword
    ) {
      setIsValid(false);
      return;
    }

    // Proceed with redirect
    router.push('/login');
  };

  return (
    <section className="relative pb-24 bg-slate-100">
      <div className="relative flex justify-center pt-10 lg:pt-9">
        <div className="container">
          <div className="w-full px-4 lg:m-5 lg:mb-10 lg:mt-12">
            <div className="max-w-full mx-auto text-center mb-3 lg:pr-9 w-full lg:w-1/2">
              <h4 className="font-semibold bg-gradient-to-br mt-10 text-dark1 text-2xl mb-8 md:font-bold lg:text-2xl">
                Welcome. Create your account! <br />
                <span className="text-sm font-normal">
                  Register your email and let&apos;s get started.
                </span>
              </h4>
            </div>
          </div>
          {/* --start-- */}
          <div className="m-8">
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  name="floating_email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-Dark-blue peer"
                  placeholder=" "
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-Dark-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>

              {/* Password Fields */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  name="floating_password"
                  id="floating_password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-Dark-blue peer"
                  placeholder=" "
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  htmlFor="floating_password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-Dark-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  name="repeat_password"
                  id="floating_repeat_password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-Dark-blue peer"
                  placeholder=" "
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <label
                  htmlFor="floating_repeat_password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-Dark-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Confirm password
                </label>
                {!isValid && password !== repeatPassword && (
                  <p className="text-red-500 text-sm">Passwords do not match</p>
                )}
              </div>

              {/* First Name and Last Name Fields */}
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="floating_first_name"
                    id="floating_first_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-Dark-blue peer"
                    placeholder=" "
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label
                    htmlFor="floating_first_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-Dark-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    First name
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="floating_last_name"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-Dark-blue peer"
                    placeholder=" "
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <label
                    htmlFor="floating_last_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-Dark-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Last name
                  </label>
                </div>
              </div>

              {/* Phone Fields */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    name="floating_phone"
                    id="floating_phone"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-Dark-blue peer"
                    placeholder=" "
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <label
                    htmlFor="floating_phone"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-Dark-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phone (123-456-7890)
                  </label>
                </div>

              {/* User Type Dropdown */}
              <div className="relative z-0 w-full mb-5 group">
                <select
                  id="UserType"
                  required
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-Dark-blue peer"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option disabled value="">
                    What is your interest?
                  </option>
                  <option value="User Music Experience">
                    Music Experience
                  </option>
                  <option value="Event Organizer">Event Organizer</option>
                </select>
                <label
                  htmlFor="UserType"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-Dark-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  User Type
                </label>
              </div>

              {/* Referral Code Field (Conditional) */}
              {userType === 'User Music Experience' && (
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="referral_code"
                    id="referral_code"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-Dark-blue peer"
                    placeholder=" "
                    value={referralCode.toUpperCase()}
                    onChange={(e) =>
                      setReferralCode(e.target.value.toUpperCase())
                    }
                    required
                  />
                  <label
                    htmlFor="referral_code"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-Dark-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Referral Code
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="text-white bg-Dark-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register
              </button>

              {!isValid && (
                <p className="text-red-500 text-sm mt-2">
                  Please fill in all fields correctly.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
