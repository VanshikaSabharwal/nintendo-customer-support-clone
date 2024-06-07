import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <div>
        <div className="topSupport">
          <div className="supportLogo">
            <Link href="/" className="logoImg">
              <Image
                width={200}
                height={200}
                src="/images/nintendo-logo-red-background.jpg"
                alt="Nintendo Logo"
              />
            </Link>
            <h1>Customer Support</h1>
          </div>
          <div className="supportLogin">
            <Link href="/login">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-person-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
              Login/Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
