// data/achievements.ts

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  role: string;
  description: string;
  imagePath: string;
  certificateNumber?: string;
}

export const achievements: Achievement[] = [
  {
    id: "basarnas",
    title: "Backend Web Developer - SIMORE",
    organization: "BASARNAS Provinsi Bengkulu",
    date: "18 Juli 2024",
    role: "Backend Web Developer",
    description: "Membangun sistem monitoring kompetensi rescuer (SIMORE) untuk BASARNAS Provinsi Bengkulu.",
    imagePath: "/assets/Images/SertiBASARNAS.png",
    certificateNumber: "6 / (4K8KL - 2024)",
  },
  {
    id: "bmkg-geofisika",
    title: "Fullstack Developer & QA - Earthquake Database",
    organization: "BMKG Stasiun Geofisika Kepahiang",
    date: "29 Juli 2025",
    role: "Fullstack Developer & Quality Assurance",
    description: "Feature enhancement dan maintenance website database gempa bumi.",
    imagePath: "/assets/Images/SertiBMKG-Geofisika.PNG",
    certificateNumber: "e.B/HM.02.04/027/KKSI/VII/2025",
  },
  {
    id: "bmkg-klimatologi",
    title: "Fullstack Developer & QA - 3 Website Projects",
    organization: "BMKG Stasiun Klimatologi Bengkulu",
    date: "29 Juli 2025",
    role: "Fullstack Developer & Quality Assurance",
    description: "Pengembangan 3 website: PTSP, Visitor Guest Book, dan Digital Employee Directory.",
    imagePath: "/assets/Images/SertiBMKG-Klimatologi.JPG",
    certificateNumber: "e.B/HM.02.04/026/KBGL/VII/2025",
  },
  {
    id: "bmkg-meteorologi",
    title: "Fullstack Developer & QA - MetFlight Radar",
    organization: "BMKG Stasiun Meteorologi Bengkulu",
    date: "14 Agustus 2025",
    role: "Fullstack Developer & Quality Assurance",
    description: "Pengembangan website MetFlight Radar untuk monitoring penerbangan.",
    imagePath: "/assets/Images/SertiBMKG-Meteorologi.png",
    certificateNumber: "e.B/HM.02.04/003/KBKS/VIII/2025",
  },
  {
    id: "snia",
    title: "Panitia Pelaksana SNIA 2023",
    organization: "Universitas Jenderal Achmad Yani",
    date: "2 November 2023",
    role: "Committee Member",
    description: "Seminar Nasional Informatika dan Aplikasinya (SNIA) 2023 dengan tema Transformasi Pendidikan Disrupsi AI.",
    imagePath: "/assets/Images/SERTIFIKAT SNIA.png",
    certificateNumber: "037/SNIA/IF-FSI-UNJANI/XI/2023",
  },
  {
    id: "minilemon",
    title: "Fullstack Developer Internship",
    organization: "Minilemon Nusantara",
    date: "03 Juni 2025 - 03 Desember 2025",
    role: "Fullstack Developer Intern",
    description: "Magang selama 5 bulan sebagai Fullstack Developer.",
    imagePath: "/assets/Images/SertiMinilemon.png",
    certificateNumber: "-",
  },
];
