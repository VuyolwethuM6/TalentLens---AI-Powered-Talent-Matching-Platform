import React from 'react';
import { getHighlighter } from 'shiki';
import { motion } from 'framer-motion';

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [html, setHtml] = React.useState('');

  React.useEffect(() => {
    getHighlighter({
      theme: 'github-dark',
      langs: [language],
    }).then(highlighter => {
      const highlighted = highlighter.codeToHtml(code, { lang: language });
      setHtml(highlighted);
    });
  }, [code, language]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg overflow-hidden"
    >
      <div
        className="p-4 bg-[#0d1117] overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </motion.div>
  );
}