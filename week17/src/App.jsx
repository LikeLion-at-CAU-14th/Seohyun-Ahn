import styled from 'styled-components';

function App() {
  const name = import.meta.env.VITE_NAME; // '안서현' 안해도 .env파일로
  const role = 'Frontend Developer';
  const message = '프론트엔드';
  const bgColor = '#fef3e2';
  const avatar = '🦁';
  const showBadge = true;
  const socialUrl = '개인 깃허브 링크';

  return (
    <Wrapper>
      <Card $bg={bgColor}>
        {showBadge && <Badge>Likelion 14th</Badge>}
        <Avatar>{avatar}</Avatar>
        <Name>{name}</Name>
        <Role>{role}</Role>
        <Message>{message}</Message>
        {socialUrl && (
          <Link href={socialUrl} target="_blank" rel="noreferrer">
            깃허브 링크
          </Link>
        )}
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f4f4f5;
`;

const Card = styled.div`
  position: relative;
  width: 320px;
  padding: 40px 32px;
  border-radius: 20px;
  background: ${(props) => props.$bg};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

const Badge = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 999px;
  background: #ff6b35;
  color: white;
  font-weight: 600;
`;

const Avatar = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const Name = styled.h1`
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 4px;
`;

const Role = styled.p`
  font-size: 14px;
  color: #888;
  margin: 0 0 16px;
`;

const Message = styled.p`
  font-size: 16px;
  color: #333;
  margin: 0 0 20px;
`;

const Link = styled.a`
  display: inline-block;
  font-size: 14px;
  color: #ff6b35;
  font-weight: 600;
  text-decoration: none;
`;

export default App;