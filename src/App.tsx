import { useForm, type SubmitHandler } from 'react-hook-form';
import './App.css';

type FormFields = {
  email: string;
  password: string;
};

// 23:30 into the video
// https://www.youtube.com/watch?v=cc_xmawJ8Kg&t=108s
export default function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: 'test@example.com',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      throw new Error('Email already taken'); // Simulate an error for demonstration
      console.log(data);
    } catch (error) {
      console.error('Submission error:', error);
      setError('root', {
        message: 'This email is already taken.',
      });
    }
  };

  return (
    <form className="space-y-4 w-1/2" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Email is required',
          // pattern: {
          //   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          //   message: 'Invalid email address',
          // },
          validate: (value) => value.includes('@') || 'Email must contain @',
        })}
        type="text"
        placeholder="Enter your email"
        className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
      {errors.email && (
        <div className="text-red-500">
          {errors.email.message || 'Email is required'}
        </div>
      )}
      <input
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long',
          },
        })}
        type="password"
        placeholder="Enter your password"
        className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
      {errors.password && (
        <div className="text-red-500">
          {errors.password.message || 'Password is required (min 8 characters)'}
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
      {errors.root && (
        <div className="text-red-500">
          {errors.root.message || 'An error occurred'}
        </div>
      )}
    </form>
  );
}
