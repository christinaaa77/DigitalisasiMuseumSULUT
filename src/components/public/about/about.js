import React from "react";
import { Card } from "react-bootstrap";
import { StrukturDinas } from "assets";
import { StrukturUptd } from "assets";
import "./about.css";
import Loader from "../loading/LoadingPage";

function About() {
  return (
    <Card className="container-about">
      <Loader />
      <div className="fotoprofil">
        <h1 className="foto-profil">
          <strong className="text-profil"></strong>
        </h1>
      </div>

      <div className="content-title">
        <div className="profil-title">
          <h2 className="title-museum">
            <strong className="profiltitle">
              UPTD Taman Budaya <br /> dan Museum Sulawesi Utara
            </strong>
          </h2>
          <h3 className="title-location">
            Kota Manado, Sulawesi Utara
            <br /> Dinas Kebudayaan Daerah Provinsi Sulawesi Utara
          </h3>
        </div>
      </div>
      <div className="profil-name">
        <div className="profil-content">
          <div className="title1">
            <h4 className="title-type">
              <strong className="main-title-type">Jenis Museum</strong>
              <br />
              Museum Umum
            </h4>
          </div>
          <div className="title2">
            <h5 className="title-type2">
              <strong className="main-title-type2">Tipe Museum</strong>
              <br />
              Tipe B
            </h5>
          </div>
          <div className="title3">
            <h6 className="title-pengelola">
              <strong className="main-title-pengelola">Pengelola</strong>
              <br />
              Dinas Kebudayaan Daerah Provinsi Sulawesi Utara
            </h6>
          </div>
          <div className="title4">
            <h7 className="title-pemilik">
              <strong className="main-title-pemilik">
                Pemilik <br />
              </strong>
              Pemerintah Provinsi Sulawesi Utara
            </h7>
          </div>
        </div>
      </div>

      <div className="isi-content">
        <div className="history-title">
          <h8 className="history">
            <strong className="sejarah">
              <br />
              Sejarah
            </strong>
            <br />
            Sejarah Museum Provinsi Sulawesi Utara berawal dari diserahkannya
            sejumlah temuan benda-benda keramik oleh seorang anggota masyarakat
            dari Desa Rasi Kecamatan Ratahan Kabupaten Minahasa Tenggara yang
            bernama Bola Lensun pada tahun 1967. Dengan begitu banyak temuan
            benda-benda yang terkumpul, pemerintah dalam hal ini orda Dirjen
            Kebudayaan, Departemen Pendidikan dan Kebudayaan pada Pelita II
            tahun anggaran 1974 – 1977 melalui proyek pengembangan kebudayaan
            Provinsi Sulawesi Utara membuat tersedianya anggaran pembangunan
            museum seluas 1400 meter persegi. Pada tahun anggaran 1977 – 1978
            lokasi pembangunan museum Negeri Provinsi Sulawesi Utara diperluas
            menjadi 11.048 meter persegi dan lokasinya terletak dipusat kota
            yaitu di jalan W.R. Supratman No. 72 Manado. Sejak tahun 1974 museum
            Negeri Provinsi Sulawesi Utara dikenal dengan nama museum persiapan
            resmi menjadi Museum Negeri Provinsi Sulawesi Utara.
          </h8>
        </div>
        <div className="museum-title">
          <h9 className="museumsulut">
            <strong className="museum">Museum Sulawesi Utara</strong>
            <br /> Museum ini menyimpan berbagai warisan budaya leluhur dan
            budaya kearifan lokal leluhur dari pra sejarah hingga zaman modern
            hingga saat ini.
          </h9>
        </div>
        <div className="koleksi-title">
          <h10 className="koleksimuseum">
            <strong className="koleksi">Koleksi Museum</strong>
            <br /> -
          </h10>
        </div>
        <div className="visi-title">
          <h11 className="visimuseum">
            <strong className="visi">Visi</strong>
            <br /> Terwujudnya Museum Negeri Provinsi Sulawesi Utara sebagai
            etalase kehidupan alam dan sejarah budaya Sulawesi Utaraa, yang
            informatif, edukatif dan rekreatif.
          </h11>
        </div>
        <div className="misi-title">
          <h11 className="misimuseum">
            <strong className="misi">Misi</strong>
            <br /> 1. Mengembangkan manajemen penyelenggaraan dan pengelolaan
            permuseuman yang tepat
            <br />
            2. Mengembangkan sistem informasi koleksi museum dalam penanganan
            database koleksi
            <br />
            3. Meningkatkan upaya pengumpulan dan pendataan benda-benda cagar
            budaya
            <br />
            4. Meningkatkan kualitas SDM permuseuman
            <br />
            5. Memberdayakan SDM yang telah mengikuti diklat/kursus permuseuman
            dalam penyelenggaraan dan pengelolaan museum
            <br />
            6. mengembangkan kerjasama dan kordinasi dengan museum-museum
            lainnya di dalam maupun diluar negeri
            <br />
            7. Menerapkan sistem pelayanan prima terhadap pengunjung pameran
            museum
          </h11>
        </div>
        <div className="struktur-dinas-title">
          <h11 className="strukturdinas">
            <strong className="dinas">
              Struktur Organisasi Dinas Kebudayaan Daerah Sulawesi Utara
            </strong>
          </h11>
          <img src={StrukturDinas} className="strukturdinas" alt="..." />
        </div>
        <div className="struktur-uptd-title">
          <h11 className="strukturuptd">
            <strong className="uptd">
              Struktur Organisasi UPTD Taman Budaya dan Museum Dinas Kebudayaan
              Daerah Provinsi Sulawesi Utara
            </strong>
          </h11>
          <img src={StrukturUptd} className="strukturuptd" alt="..." />
        </div>
      </div>
    </Card>
  );
}

export default About;
