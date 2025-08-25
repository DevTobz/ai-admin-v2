import logo from "../assets/images/svg/25th-and-staffing-logo.svg";
import thanks from "../assets/images/svg/icons/thanks.svg";
import icon1 from "../assets/images/svg/icons/icon1.svg";
import icon2 from "../assets/images/svg/icons/icon2.svg";
import icon3 from "../assets/images/svg/icons/icon3.svg";
import add from "../assets/images/svg/icons/add.svg";
import remove from "../assets/images/svg/icons/remove.svg";
import eben from "../assets/images/png/eben.png";

const img = {
  logo: logo,
  thanks: thanks,
  icon1: icon1,
  icon2: icon2,
  icon3: icon3,
  add: add,
  remove: remove,
  eben: eben,

  competenceArea: [
    {
      id: 1,
      title: "Communication Skills",
      comments:
        "Ebenezer provided concise answers but could elaborate more on his background and experiences.",
      score: "58",
      rating: "Good",
    },
    {
      id: 2,
      title: "Technical Knowledge",
      comments:
        "Discussed an HR automated process project but lacked detailed technical insights.",
      score: "74",
      rating: "Good",
    },
    {
      id: 3,
      title: "Problem Solving",
      comments:
        "Demonstrated ability to navigate challenges in project planning and execution.",
      score: "68",
      rating: "Good",
    },
    {
      id: 4,
      title: "Cultural Fit",
      comments:
        "Expressed alignment with career goals and demonstrated teamwork as a key strength.",
      score: "55",
      rating: "Good",
    },
    {
      id: 5,
      title: "Experience Relevance",
      comments:
        "Experience with HR processes is relevant, but more detail on specific roles and outcomes would be helpful.",
      score: "80",
      rating: "Good",
    },
  ],
};

export default img;
