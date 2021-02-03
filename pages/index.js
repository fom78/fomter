import { useEffect } from "react"
import Head from "next/head"

import Button from "components/Button"
import GitHub from "components/Icons/GitHub"
import Logo from "components/Icons/Logo"
import Loading from "components/Loading"
import Spinner from "components/Spinner";
import useUser, { USER_STATES } from "hooks/useUser"

import { colors } from "styles/theme"
import { loginWithGitHub } from "firebase/client"
import { useRouter } from "next/router"

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <Head>
        <title>fomter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <section>
          <Logo width="150" height="200" />
          <h1>FomTer</h1>
          <h2>
            Hablando sobre algo
            <br />
            with people 👩‍💻👨‍💻
          </h2>

          <div>
            {user === USER_STATES.NOT_LOGGED && (
              <Button onClick={handleClick}>
                <GitHub fill="#fff" width={24} height={24} />
                Login with GitHub
              </Button>
            )}
            {/* {user === USER_STATES.NOT_KNOWN && <img src="spinner.gif" />} */}
            {/* {user === USER_STATES.NOT_KNOWN && <Spinner />} */}
            {user === USER_STATES.NOT_KNOWN && <Loading size={45} />}
          </div>
        </section>

      <style jsx>{`
        img {
          width: 120px;
        }

        div {
          margin-top: 16px;
        }

        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }

        h1 {
          color: ${colors.secondary};
          font-weight: 800;
          margin-bottom: 16px;
        }

        h2 {
          color: ${colors.primary};
          font-size: 21px;
          margin: 0;
        }
      `}</style>
    </>
  )
}
