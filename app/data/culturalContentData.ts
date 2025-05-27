import { CulturalContentData } from "../types/culturalContent";

export const culturalContentData: CulturalContentData = {
  stories: [
    {
      id: "1",
      title: "Roro Jonggrang",
      excerpt:
        "Legenda Jawa tentang asal-usul Candi Prambanan dan kutukan sang putri...",
      imageUrl: "/images/roro-jonggrang.jpg",
      language: "Jawa",
    },
    {
      id: "2",
      title: "Sangkuriang",
      excerpt:
        "Cerita rakyat Sunda tentang asal mula Gunung Tangkuban Perahu...",
      imageUrl: "/images/sangkuriang.jpg",
      language: "Sunda",
    },
    {
      id: "3",
      title: "Malin Kundang",
      excerpt:
        "Kisah anak durhaka dari Sumatera Barat yang dikutuk menjadi batu...",
      imageUrl: "/images/malin-kundang.jpg",
      language: "Minangkabau",
    },
  ],
  proverbs: [
    {
      id: "1",
      text: "Ajining diri saka lathi, ajining raga saka busana.",
      translation:
        "Kehormatan diri berasal dari ucapan, kehormatan badan berasal dari pakaian.",
      explanation:
        "Peribahasa Jawa tentang pentingnya menjaga tutur kata dan penampilan.",
    },
    {
      id: "2",
      text: "Ulah unggut-unggut kacang heuras.",
      translation: "Jangan sombong seperti kacang kedelai.",
      explanation:
        "Peribahasa Sunda yang mengajarkan untuk tidak sombong meski sudah berhasil.",
    },
    {
      id: "3",
      text: "Alah bisa karena biasa.",
      translation: "Bisa karena terbiasa.",
      explanation:
        "Peribahasa Melayu tentang pentingnya latihan dan pembiasaan.",
    },
  ],
  trivia: [
    {
      id: "1",
      fact: "Bahasa Jawa memiliki 3 tingkatan: Ngoko, Madya, dan Krama.",
      category: "Bahasa",
    },
    {
      id: "2",
      fact: "Aksara Sunda Kuno (Kaganga) masih dipelajari di beberapa sekolah di Jawa Barat.",
      category: "Aksara",
    },
    {
      id: "3",
      fact: "Wayang kulit diakui UNESCO sebagai Warisan Budaya Dunia sejak 2003.",
      category: "Budaya",
    },
  ],
};
