import QRCodeForm, { QRCodeFormType } from "@/components/QRCodeForm";
import dbConnect from "@/db/dbConnect";
import QRCode from "@/db/models/QRCode";
import axios from "@/lib/axios";
import styles from "@/styles/ShortLinkEditPage.module.css";
import Head from "next/head";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { id } = context.query;
  await dbConnect();
  const qrcode = await QRCode.findById(id);
  if (qrcode) {
    return {
      props: {
        qrcode: JSON.parse(JSON.stringify(qrcode)),
      },
    };
  }

  return {
    notFound: true,
  };
}

export default function QRCodeEditPage({ qrcode }) {
  const router = useRouter();
  const { id } = router.query;

  async function handleSubmit(values) {
    await axios.patch(`/qrcodes/${id}`, values);
    router.push("/qrcodes/");
  }

  return (
    <>
      <Head>
        <title>QRCode 수정하기 - Shortit</title>
      </Head>
      <div className={styles.page}>
        <h1 className={styles.title}>QRCode 수정하기</h1>
        <QRCodeForm
          type={QRCodeFormType.Edit}
          onSubmit={handleSubmit}
          initialValues={qrcode}
        />
      </div>
    </>
  );
}
