import Link from "next/link";
import { albums } from "@/data/albums";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container">
      {/* 과제: 페이지 제목을 div 대신 알맞은 시맨틱 태그로 바꾸기 */}
      <h1 className="page-title">요즘 내가 듣는 앨범</h1>
      <p className="page-desc">내 플레이리스트에서 자주 도는 앨범 8장</p>
      <ul className="album-grid">
        {albums.map((album) => (
          <li key={album.id}>
            <Link href={`/albums/${album.id}`} className="album-card">
          {/* 실습2-image태그 수정 */}
              <Image
              src={album.cover}
              alt={`${album.artist} - ${album.title} 앨범 표지`}
              width= {600}
              height= {600}
              className="album-cover"
              />
              
              <h2 className="album-title">{album.title}</h2>
              <h3 className="album-artist">{album.artist}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}