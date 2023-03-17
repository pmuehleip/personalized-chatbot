import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';


const CodeBox = ({ code }) => {
    const [isCopied, setIsCopied] = useState(false);
  
    const handleCopyClick = () => {
      navigator.clipboard.writeText(code);
      setIsCopied(true);
    };
  
    return (
      <>
        <SyntaxHighlighter language="javascript" style={tomorrow}>{code}</SyntaxHighlighter>
        <Button onClick={handleCopyClick}>{isCopied ? 'Copied!' : 'Copy Code'}</Button>
      </>
    );
  };

  export default CodeBox;
  