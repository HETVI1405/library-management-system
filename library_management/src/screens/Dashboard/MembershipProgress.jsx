
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MembershipProgress.css"; 

export default function MembershipProgress({ members }) {
  const [stats, setStats] = useState({
    student: { percent: 0, count: 0 },
    faculty: { percent: 0, count: 0 },
    public: { percent: 0, count: 0 },
    premium: { percent: 0, count: 0 },
    other: { percent: 0, count: 0 },
  });

  useEffect(() => {
    if (members && members.length > 0) {
      const total = members.length;

      const calc = (type) => {
        const count = members.filter((m) => m.memberShipType === type).length;
        const percent = (count / total) * 100;
        return { percent: Math.round(percent), count };
      };

      setStats({
        student: calc("student"),
        faculty: calc("faculty"),
        public: calc("public"),
        premium: calc("premium"),
        other: calc("other"),
      });
    }
  }, [members]);

  return (
    <div className="progress-card">
      <h3 style={{fontSize:"22px", padding:"20px"}}> Membership Distribution</h3>

      {/* Student */}
      <div className="progress-item">
        <span>
          <strong>Students</strong> – {stats.student.count} members
          <span>&nbsp;&nbsp;&nbsp;&nbsp;{stats.student.percent}%</span>
        </span>
        <div className="progress-bar">
          <div
            className="fill student"
            style={{ width: `${stats.student.percent}%` }}
          ></div>
        </div>
        <small className="text-muted">Regular learners and students</small>
      </div>

      {/* Faculty */}
      <div className="progress-item">
        <span>
          <strong>Faculty</strong> – {stats.faculty.count} members
          <span>&nbsp;&nbsp;&nbsp;&nbsp;{stats.faculty.percent}%</span>
        </span>
        <div className="progress-bar">
          <div
            className="fill faculty"
            style={{ width: `${stats.faculty.percent}%` }}
          ></div>
        </div>
        <small className="text-muted">Teaching & academic staff</small>
      </div>

      {/* Public */}
      <div className="progress-item">
        <span>
          <strong>Public</strong> – {stats.public.count} members
          <span>&nbsp;&nbsp;&nbsp;&nbsp;{stats.public.percent}%</span>
        </span>
        <div className="progress-bar">
          <div
            className="fill public"
            style={{ width: `${stats.public.percent}%` }}
          ></div>
        </div>
        <small className="text-muted">General visitors & public users</small>
      </div>

   

      {/* Other */}
      <div className="progress-item">
        <span>
          <strong>Other</strong> – {stats.other.count} members
          <span>&nbsp;&nbsp;&nbsp;&nbsp;{stats.other.percent}%</span>
        </span>
        <div className="progress-bar">
          <div
            className="fill other"
            style={{ width: `${stats.other.percent}%` }}
          ></div>
        </div>
        <small className="text-muted">Uncategorized or custom members</small>
      </div>
    </div>
  );
}
