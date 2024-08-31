import Link from "next/link"

const LoginSignUp = () => {
    return (
        <div className="flex h-full items-center gap-[20px] font-semibold text-black">
            <Link href={'/login'}>
                <button className="w-[80px] h-[30px] bg-white text-[15px] rounded-full">
                    Log In
                </button>
            </Link>
            <Link href={'/signUp'}>
                <button className="w-[80px] h-[30px] bg-white text-[15px] rounded-full">
                    Sign Up
                </button>
            </Link>
        </div>
    )
}

export default LoginSignUp