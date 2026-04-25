import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import courses from '../data/courses';
// import NotFound from './NotFound';

const SingleCourse = () => {
  const params = useParams();
  const navigate = useNavigate();

  const course = courses.find((course) => course.slug === params.slug);

  const toAllCoursesLink = (
    <Link to=".." relative="path">
      All courses
    </Link>
  );

  useEffect(() => {
    if (!course) {
      navigate('..', { relative: 'path' });
    }
  }, [course, navigate]);

  // if (!course)
  //   return (
  //     <>
  //       <NotFound />
  //       {toAllCoursesLink}
  //     </>
  //   );

  return (
    <>
      <h1>{course?.title}</h1>
      <h2>{course?.slug}</h2>
      <h3>{course?.id}</h3>
      {toAllCoursesLink}
    </>
  );
};

export default SingleCourse;
