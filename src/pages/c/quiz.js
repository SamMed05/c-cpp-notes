import React, {useEffect} from 'react';
import Layout from '@theme/Layout';

export default function QuizRedirect() {
  useEffect(() => {
    // replace so user can go Back to previous docs page
    window.location.replace('/c/quiz.html');
  }, []);
  return null;
}
