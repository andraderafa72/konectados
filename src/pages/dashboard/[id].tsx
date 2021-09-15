import { get } from "@firebase/database";
import { ref } from "firebase/database";
import { GetServerSideProps } from "next";
import { DashboardSetup } from "../../components/DashboardSetup";
import { ResultTable } from "../../components/ResultTable";
import { database } from "../../services/firebase";

export default function Setup ({ setup }) {
  return (
    <main>
      <section>
        
        <DashboardSetup userSetup={setup} />
        
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params
  const data = await get(ref(database, 'setups/' + id))
  const setup = data.val()
  return {
    props: {
      setup
    }
  }
}