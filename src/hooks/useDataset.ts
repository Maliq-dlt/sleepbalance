import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export interface TeenData {
  ID: string;
  Name: string;
  Age: number;
  Gender: string;
  Daily_Usage_Hours: number;
  Sleep_Hours: number;
  Anxiety_Level: number;
  Depression_Level: number;
  Social_Interactions: number;
  Addiction_Level: number;
  Time_on_Social_Media: number;
  Screen_Time_Before_Bed: number;
}

export interface StudentData {
  student_id: string;
  age: number;
  gender: string;
  study_hours_per_day: number;
  smartphone_usage_hours: number;
  sleep_hours: number;
  mental_health_status: string;
  final_exam_score: number;
}

export const useDataset = () => {
  const [teenData, setTeenData] = useState<TeenData[]>([]);
  const [studentData, setStudentData] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeenData = async () => {
      try {
        const response = await fetch('/Dataset/teen_phone_addiction_dataset.csv');
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            setTeenData(results.data as TeenData[]);
          },
        });
      } catch (error) {
        console.error('Error loading teen dataset:', error);
      }
    };

    const fetchStudentData = async () => {
      try {
        const response = await fetch('/Dataset/student_digital_life.csv');
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            setStudentData(results.data as StudentData[]);
            setLoading(false);
          },
        });
      } catch (error) {
        console.error('Error loading student dataset:', error);
        setLoading(false);
      }
    };

    fetchTeenData();
    fetchStudentData();
  }, []);

  return { teenData, studentData, loading };
};
