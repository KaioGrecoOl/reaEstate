import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
// import { useDispatch } from 'react-redux';
// import { signInSuccess } from '../redux/user/userSlice';

export default function OAuth() {
  // const dispatch = useDispatch();
  const handlerGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      console.log(result.user);
    } catch (error) {
      console.log('Could not sign in with Google.', error)
    }
  }
  return (
    <button onClick={handlerGoogleClick} type="button" className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
      CONTINUE WITH GOOGLE
    </button>
  );
}
