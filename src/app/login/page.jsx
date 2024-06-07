import styles from "./style.module.css";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link href="/" className="logoImg">
          <Image
            width={200}
            height={300}
            src="/images/nintendo-logo-red-background.jpg"
            alt="Nintendo Logo"
          />
        </Link>
        <p>Nintendo Account</p>
      </div>
      <div className={styles.loginContainer}>
        <h1 className={styles.heading}>Nintendo Account</h1>
        <div className={styles.login}>
          <p>Sign in to your Nintendo Account</p>
          <p>or create a new account</p>
          <div className={styles.loginOptions}>
            <div className={styles.signinOption}>
              <h2 className={styles.btnHeading}>For existing users</h2>
              <Link href="/signin" className={styles.btn}>
                Sign in
              </Link>
            </div>
            <div className={styles.signupOption}>
              <h2 className={styles.btnHeading}>Don&apos;t have an account</h2>
              <Link href="/signup" className={styles.btn}>
                Create a Nintendo Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
