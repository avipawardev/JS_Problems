const Course = require('../models/Course');
const User = require('../models/User');
const Lesson = require('../models/Lesson');

const dummyCourses = [
  {
    title: 'Complete Web Development Bootcamp 2024',
    description: 'Master HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build 10+ real-world projects.',
    price: 89.99,
    category: 'Technology',
    level: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
    rating: 4.8,
    reviews: 1250,
    published: true
  },
  {
    title: 'AI & Machine Learning Masterclass',
    description: 'Learn Python, TensorFlow, Neural Networks, and Deep Learning from scratch.',
    price: 129.99,
    category: 'AI & Machine Learning',
    level: 'intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400',
    rating: 4.9,
    reviews: 890,
    published: true
  },
  {
    title: 'UI/UX Design Complete Course',
    description: 'Master Figma, Adobe XD, user research, wireframing, and prototyping.',
    price: 79.99,
    category: 'Design',
    level: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
    rating: 4.7,
    reviews: 650,
    published: true
  },
  {
    title: 'Business Strategy & Management',
    description: 'Learn strategic planning, leadership, and business growth strategies.',
    price: 99.99,
    category: 'Business',
    level: 'intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    rating: 4.6,
    reviews: 420,
    published: true
  },
  {
    title: 'Digital Marketing Mastery',
    description: 'SEO, Social Media Marketing, Google Ads, Email Marketing, and Analytics.',
    price: 69.99,
    category: 'Marketing',
    level: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    rating: 4.5,
    reviews: 780,
    published: true
  },
  {
    title: 'Class 10 Mathematics Complete Course',
    description: 'Complete CBSE Class 10 Math syllabus with practice questions and solutions.',
    price: 0,
    category: '1st-10th Class',
    level: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400',
    rating: 4.9,
    reviews: 2100,
    published: true
  },
  {
    title: 'React & Redux Complete Guide',
    description: 'Build modern web applications with React, Redux, Hooks, and Context API.',
    price: 94.99,
    category: 'Technology',
    level: 'intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    rating: 4.8,
    reviews: 1100,
    published: true
  },
  {
    title: 'Python for Data Science',
    description: 'Learn Python, Pandas, NumPy, Matplotlib, and data analysis techniques.',
    price: 84.99,
    category: 'AI & Machine Learning',
    level: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
    rating: 4.7,
    reviews: 950,
    published: true
  },
  {
    title: 'Graphic Design Fundamentals',
    description: 'Master Adobe Photoshop, Illustrator, and design principles.',
    price: 74.99,
    category: 'Design',
    level: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400',
    rating: 4.6,
    reviews: 540,
    published: true
  },
  {
    title: 'Entrepreneurship Bootcamp',
    description: 'Start and grow your business from idea to execution.',
    price: 109.99,
    category: 'Business',
    level: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400',
    rating: 4.8,
    reviews: 380,
    published: true
  },
  {
    title: 'Social Media Marketing 2024',
    description: 'Instagram, Facebook, TikTok, LinkedIn marketing strategies.',
    price: 59.99,
    category: 'Marketing',
    level: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
    rating: 4.5,
    reviews: 670,
    published: true
  },
  {
    title: 'Class 9 Science Complete Course',
    description: 'Physics, Chemistry, Biology - Complete CBSE syllabus.',
    price: 0,
    category: '1st-10th Class',
    level: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
    rating: 4.8,
    reviews: 1800,
    published: true
  }
];

const seedDatabase = async () => {
  try {
    const instructor = await User.findOne({ role: 'instructor' });
    
    if (!instructor) {
      console.log('No instructor found. Please create an instructor account first.');
      return;
    }

    await Course.deleteMany({});
    await Lesson.deleteMany({});

    for (const courseData of dummyCourses) {
      const course = await Course.create({
        ...courseData,
        instructor: instructor._id
      });

      const lessons = [
        { title: 'Introduction', content: 'Welcome to the course', order: 1, course: course._id, videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 300 },
        { title: 'Getting Started', content: 'Setup and basics', order: 2, course: course._id, videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 600 },
        { title: 'Core Concepts', content: 'Main topics covered', order: 3, course: course._id, videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 900 }
      ];

      const createdLessons = await Lesson.insertMany(lessons);
      course.lessons = createdLessons.map(l => l._id);
      await course.save();
    }

    console.log('Database seeded successfully with', dummyCourses.length, 'courses');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedDatabase;
