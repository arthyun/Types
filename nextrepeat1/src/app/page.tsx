export default function Home() {
  let name: string = 'Son';

  return (
    <div>
      <h4 className="title" style={{ color: 'red', fontSize: '20px' }}>
        애플후레시
      </h4>
      <p className="title-sub">by dev {name}</p>
    </div>
  );
}
