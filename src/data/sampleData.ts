import { Course, BlogPost } from '@/contexts/AdminContext';

import courseSanskritBasics from '@/assets/course-sanskrit-basics.jpg';
import courseGita from '@/assets/course-gita.jpg';
import courseYoga from '@/assets/course-yoga.jpg';
import courseVedicMath from '@/assets/course-vedic-math.jpg';
import courseMusic from '@/assets/course-music.jpg';
import courseStories from '@/assets/course-stories.jpg';

export const sampleCourses: Course[] = [
  {
    id: '1',
    slug: 'sanskrit-basics-for-kids',
    title: {
      en: 'Sanskrit Basics for Kids',
      hi: 'बच्चों के लिए संस्कृत की मूल बातें',
      sa: 'बालकानां कृते संस्कृतमूलतत्त्वानि',
    },
    shortDescription: {
      en: 'A fun and engaging introduction to Sanskrit alphabets, simple words, and basic conversations for young learners.',
      hi: 'छोटे विद्यार्थियों के लिए संस्कृत वर्णमाला, सरल शब्द और मूल वार्तालाप का मज़ेदार परिचय।',
      sa: 'तरुणशिष्याणां कृते संस्कृतवर्णमालायाः सरलशब्दानां मूलसंवादस्य च रमणीयः परिचयः।',
    },
    thumbnail: courseSanskritBasics,
    category: 'Sanskrit',
    level: 'Kids',
    duration: '12 weeks',
    isPopular: true,
    showOnHome: true,
    price: '₹4,999',
  },
  {
    id: '2',
    slug: 'bhagavad-gita-study',
    title: {
      en: 'Bhagavad Gita Study Circle',
      hi: 'भगवद्गीता अध्ययन मंडल',
      sa: 'भगवद्गीताध्ययनमण्डलम्',
    },
    shortDescription: {
      en: 'Deep dive into the timeless wisdom of Bhagavad Gita with verse-by-verse analysis and practical life applications.',
      hi: 'श्लोक-दर-श्लोक विश्लेषण और व्यावहारिक जीवन अनुप्रयोगों के साथ भगवद्गीता के शाश्वत ज्ञान में गहन अध्ययन।',
      sa: 'श्लोकानुश्लोकविश्लेषणेन व्यावहारिकजीवनप्रयोगैश्च भगवद्गीतायाः शाश्वतज्ञाने गहनाध्ययनम्।',
    },
    thumbnail: courseGita,
    category: 'Shastra',
    level: 'Adults',
    duration: '24 weeks',
    isPopular: true,
    showOnHome: true,
    price: '₹7,999',
  },
  {
    id: '3',
    slug: 'yoga-for-children',
    title: {
      en: 'Yoga & Meditation for Children',
      hi: 'बच्चों के लिए योग और ध्यान',
      sa: 'बालकानां कृते योगो ध्यानं च',
    },
    shortDescription: {
      en: 'Age-appropriate yoga asanas, breathing exercises, and mindfulness practices designed for growing minds.',
      hi: 'बढ़ते मन के लिए आयु-उपयुक्त योग आसन, श्वास व्यायाम और माइंडफुलनेस अभ्यास।',
      sa: 'वर्धमानमनसां कृते वयोनुकूलयोगासनाः प्राणायामाः सावधानताभ्यासाश्च।',
    },
    thumbnail: courseYoga,
    category: 'Lifestyle',
    level: 'Kids',
    duration: '8 weeks',
    isPopular: true,
    showOnHome: true,
    price: '₹3,499',
  },
  {
    id: '4',
    slug: 'vedic-mathematics',
    title: {
      en: 'Vedic Mathematics',
      hi: 'वैदिक गणित',
      sa: 'वैदिकगणितम्',
    },
    shortDescription: {
      en: 'Master ancient calculation techniques that make math fun, fast, and fascinating for students of all ages.',
      hi: 'प्राचीन गणना तकनीकों में महारत हासिल करें जो सभी आयु के छात्रों के लिए गणित को मज़ेदार और तेज़ बनाती हैं।',
      sa: 'प्राचीनगणनाप्रविधीनां ज्ञानं प्राप्नुत याः सर्वेषां छात्राणां कृते गणितं रमणीयं द्रुतं च कुर्वन्ति।',
    },
    thumbnail: courseVedicMath,
    category: 'Education',
    level: 'Teens',
    duration: '10 weeks',
    isPopular: false,
    showOnHome: false,
    price: '₹4,499',
  },
  {
    id: '5',
    slug: 'indian-classical-music',
    title: {
      en: 'Indian Classical Music Basics',
      hi: 'भारतीय शास्त्रीय संगीत की मूल बातें',
      sa: 'भारतीयशास्त्रीयसङ्गीतमूलतत्त्वानि',
    },
    shortDescription: {
      en: 'Learn the fundamentals of Indian classical music including ragas, talas, and vocal techniques.',
      hi: 'राग, ताल और स्वर तकनीकों सहित भारतीय शास्त्रीय संगीत की मूल बातें सीखें।',
      sa: 'रागताल­स्वरप्रविधीनां सहितं भारतीयशास्त्रीयसङ्गीतमूलतत्त्वानि शिक्षध्वम्।',
    },
    thumbnail: courseMusic,
    category: 'Arts',
    level: 'All Ages',
    duration: '16 weeks',
    isPopular: false,
    showOnHome: false,
    price: '₹5,999',
  },
  {
    id: '6',
    slug: 'vedic-stories-for-kids',
    title: {
      en: 'Vedic Stories & Values',
      hi: 'वैदिक कथाएं और मूल्य',
      sa: 'वैदिककथाः मूल्यानि च',
    },
    shortDescription: {
      en: 'Explore enchanting stories from Ramayana, Mahabharata, and Panchatantra that teach timeless values.',
      hi: 'रामायण, महाभारत और पंचतंत्र की मनमोहक कहानियों के माध्यम से शाश्वत मूल्य सीखें।',
      sa: 'रामायणमहाभारतपञ्चतन्त्रेभ्यः मनोहराः कथाः अन्वेषयत याः शाश्वतमूल्यानि शिक्षयन्ति।',
    },
    thumbnail: courseStories,
    category: 'Stories',
    level: 'Kids',
    duration: '6 weeks',
    isPopular: true,
    showOnHome: true,
    price: '₹2,999',
  },
];

export const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'benefits-of-learning-sanskrit',
    title: {
      en: 'Why Learning Sanskrit Enhances Cognitive Abilities',
      hi: 'संस्कृत सीखना संज्ञानात्मक क्षमताओं को क्यों बढ़ाता है',
      sa: 'संस्कृताध्ययनं बुद्धिक्षमतां किमर्थं वर्धयति',
    },
    excerpt: {
      en: 'Discover the scientific research behind how Sanskrit learning improves memory, concentration, and analytical thinking in children and adults alike.',
      hi: 'जानें कि संस्कृत सीखना बच्चों और वयस्कों दोनों में स्मृति, एकाग्रता और विश्लेषणात्मक सोच को कैसे बेहतर बनाता है।',
      sa: 'जानीत यथा संस्कृताध्ययनं बालकानां प्रौढानां च स्मृतिं एकाग्रतां विश्लेषणात्मकचिन्तनं च वर्धयति।',
    },
    thumbnail: courseSanskritBasics,
    category: 'Sanskrit Learning',
    author: 'Dr. Vidya Sharma',
    date: 'Dec 20, 2024',
    showOnHome: true,
  },
  {
    id: '2',
    slug: 'gurukul-education-modern-world',
    title: {
      en: 'Gurukul Education in the Modern World',
      hi: 'आधुनिक विश्व में गुरुकुल शिक्षा',
      sa: 'आधुनिकविश्वे गुरुकुलशिक्षा',
    },
    excerpt: {
      en: 'How traditional gurukul values of holistic education, character building, and personalized learning are more relevant than ever today.',
      hi: 'समग्र शिक्षा, चरित्र निर्माण और व्यक्तिगत शिक्षण के पारंपरिक गुरुकुल मूल्य आज पहले से कहीं अधिक प्रासंगिक कैसे हैं।',
      sa: 'समग्रशिक्षायाः चरित्रनिर्माणस्य व्यक्तिगतशिक्षणस्य च पारम्परिकगुरुकुलमूल्यानि अद्य पूर्वतोऽपि अधिकं प्रासङ्गिकानि कथम्।',
    },
    thumbnail: courseStories,
    category: 'Gurukul Life',
    author: 'Acharya Ramesh',
    date: 'Dec 15, 2024',
    showOnHome: true,
  },
  {
    id: '3',
    slug: 'celebrating-makar-sankranti',
    title: {
      en: 'Celebrating Makar Sankranti: The Festival of Harvest',
      hi: 'मकर संक्रांति: फसल का त्योहार',
      sa: 'मकरसङ्क्रान्तिः सस्योत्सवः',
    },
    excerpt: {
      en: 'Understanding the astronomical, agricultural, and spiritual significance of Makar Sankranti and how to celebrate it authentically.',
      hi: 'मकर संक्रांति के खगोलीय, कृषि और आध्यात्मिक महत्व को समझें और इसे प्रामाणिक रूप से कैसे मनाएं।',
      sa: 'मकरसङ्क्रान्तेः ज्योतिषीयकृषिआध्यात्मिकमहत्त्वं अवगच्छत तां च प्रामाणिकरूपेण कथं आचरत।',
    },
    thumbnail: courseGita,
    category: 'Festivals',
    author: 'Pandit Suresh',
    date: 'Dec 10, 2024',
    showOnHome: true,
  },
  {
    id: '4',
    slug: 'teaching-kids-meditation',
    title: {
      en: 'Teaching Kids to Meditate: A Parent\'s Guide',
      hi: 'बच्चों को ध्यान सिखाना: माता-पिता के लिए गाइड',
      sa: 'बालकान् ध्यानं शिक्षयितुम्: पितृमातृणां मार्गदर्शिका',
    },
    excerpt: {
      en: 'Simple, age-appropriate meditation techniques that parents can practice with their children at home for better focus and emotional balance.',
      hi: 'सरल, आयु-उपयुक्त ध्यान तकनीकें जो माता-पिता बेहतर फोकस के लिए घर पर अपने बच्चों के साथ अभ्यास कर सकते हैं।',
      sa: 'सरलाः वयोनुकूलध्यानप्रविधयः याः पितरः उत्तमैकाग्रतायै गृहे स्वबालकैः सह अभ्यसितुं शक्नुवन्ति।',
    },
    thumbnail: courseYoga,
    category: 'Parenting',
    author: 'Dr. Meera Joshi',
    date: 'Dec 5, 2024',
    showOnHome: true,
  },
];

export const testimonials = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: { en: 'Parent', hi: 'अभिभावक', sa: 'पिता/माता' },
    content: {
      en: 'My daughter has transformed since joining Shastrakulam. She not only speaks Sanskrit but has developed a deep love for our culture and traditions.',
      hi: 'शास्त्रकुलम् में शामिल होने के बाद मेरी बेटी बदल गई है। वह न केवल संस्कृत बोलती है बल्कि हमारी संस्कृति के प्रति गहरा प्रेम विकसित हुआ है।',
      sa: 'मम पुत्री शास्त्रकुलं प्राप्य परिवर्तिता। सा केवलं संस्कृतं न वदति अपि तु अस्माकं संस्कृतेः प्रति गहनं प्रेम विकसितम्।',
    },
    avatar: 'PS',
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    role: { en: 'Student (Adult)', hi: 'छात्र (वयस्क)', sa: 'शिष्यः (प्रौढः)' },
    content: {
      en: 'The Bhagavad Gita course changed my perspective on life. The teachers explain complex concepts with such clarity and connect them to daily life.',
      hi: 'भगवद्गीता पाठ्यक्रम ने जीवन के प्रति मेरा दृष्टिकोण बदल दिया। शिक्षक जटिल अवधारणाओं को स्पष्टता से समझाते हैं।',
      sa: 'भगवद्गीतापाठ्यक्रमः मम जीवनदृष्टिं परिवर्तितवान्। आचार्याः जटिलसंकल्पनाः स्पष्टतया व्याख्यायन्ते।',
    },
    avatar: 'RK',
  },
  {
    id: '3',
    name: 'Sunita Iyer',
    role: { en: 'Parent', hi: 'अभिभावक', sa: 'पिता/माता' },
    content: {
      en: 'The summer camp was magical! My children came back with new skills, new friends, and most importantly, a connection to their roots.',
      hi: 'ग्रीष्मकालीन शिविर जादुई था! मेरे बच्चे नए कौशल, नए दोस्तों और अपनी जड़ों से जुड़ाव के साथ वापस आए।',
      sa: 'ग्रीष्मशिविरं मायावी आसीत्! मम बालकाः नवकौशलैः नवमित्रैः स्वमूलैः सह सम्बन्धेन च प्रत्यागताः।',
    },
    avatar: 'SI',
  },
];

export const courseCategories = [
  'Sanskrit',
  'Shastra',
  'Lifestyle',
  'Education',
  'Arts',
  'Stories',
  'Yoga',
  'Vedic Sciences',
];

export const blogCategories = [
  'Sanskrit Learning',
  'Parenting',
  'Gurukul Life',
  'Festivals',
  'Vedic Stories',
  'Lifestyle',
];
