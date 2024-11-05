import  { useEffect, useState } from 'react';
import axios from 'axios';
import { IDistrict, IDivision, ISubDistrict } from '../../types';



const SelectDivison= () => {
  const [divisions, setDivisions] = useState<IDivision[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [subDistricts, setSubDistricts] = useState<ISubDistrict[]>([]);

  const [selectedDivision, setSelectedDivision] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<string>('');

  // Fetch divisions from the API
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await axios.get<IDivision[]>('https://bdapis.com/api/v1.2/division');
        setDivisions(response.data); // Assuming the API returns an array of divisions
      } catch (error) {
        console.error('Error fetching divisions:', error);
      }
    };

    fetchDivisions();
  }, []);

  // Fetch districts based on the selected division
  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedDivision) {
        try {
          const response = await axios.get<IDistrict[]>(`https://bdapis.com/api/v1.2/district?division_id=${selectedDivision}`);
          setDistricts(response.data); // Assuming the API returns an array of districts for the selected division
          setSelectedDistrict(''); // Reset district selection when division changes
          setSelectedSubDistrict(''); // Reset sub-district selection when division changes
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      } else {
        setDistricts([]); // Clear districts if no division is selected
      }
    };

    fetchDistricts();
  }, [selectedDivision]);

  // Fetch sub-districts based on the selected district
  useEffect(() => {
    const fetchSubDistricts = async () => {
      if (selectedDistrict) {
        try {
          const response = await axios.get<ISubDistrict[]>(`https://bdapis.com/api/v1.2/upazila?district_id=${selectedDistrict}`);
          setSubDistricts(response.data); // Assuming the API returns an array of sub-districts for the selected district
          setSelectedSubDistrict(''); // Reset sub-district selection when district changes
        } catch (error) {
          console.error('Error fetching sub-districts:', error);
        }
      } else {
        setSubDistricts([]); // Clear sub-districts if no district is selected
      }
    };

    fetchSubDistricts();
  }, [selectedDistrict]);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="division" className="block mb-2">Select Division</label>
        <select
          id="division"
          value={selectedDivision}
          onChange={(e) => setSelectedDivision(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">-- Select Division --</option>
          {divisions.map((division) => (
            <option key={division.id} value={division.id}>{division.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="district" className="block mb-2">Select District</label>
        <select
          id="district"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="border p-2 w-full"
          disabled={!selectedDivision} // Disable if no division is selected
        >
          <option value="">-- Select District --</option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>{district.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="subDistrict" className="block mb-2">Select Sub-District</label>
        <select
          id="subDistrict"
          value={selectedSubDistrict}
          onChange={(e) => setSelectedSubDistrict(e.target.value)}
          className="border p-2 w-full"
          disabled={!selectedDistrict} // Disable if no district is selected
        >
          <option value="">-- Select Sub-District --</option>
          {subDistricts.map((subDistrict) => (
            <option key={subDistrict.id} value={subDistrict.id}>{subDistrict.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectDivison;
