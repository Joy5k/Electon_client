import  { useEffect, useState } from 'react';
import axios from 'axios';
import { IDistrict, IDivision, ISubDistrict } from '../../types';



const SelectDivision= () => {
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
        const response:any = await axios.get<IDivision[]>('https://bdapis.com/api/v1.2/divisions');
        setDivisions(response.data?.data); // Assuming the API returns an array of divisions
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
          const response:any = await axios.get<IDistrict[]>(`https://bdapis.com/api/v1.2/division/${selectedDivision}`);
          setDistricts(response.data.data); // Assuming the API returns an array of districts for the selected division
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
    const fetchSubDistricts = async ():Promise<void> => {
      if (selectedDistrict) {
        try {
          const response:any = await axios.get(`https://bdapis.com/api/v1.2/district/${selectedDistrict}`);
          setSubDistricts(response.data.data[0]); // Assuming the API returns an array of sub-districts for the selected district
         console.log(response.data.data[0])
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
    <div className="space-y-4 flex flex-col md:flex-row lg:flex-row align-middle items-center gap-5">
      <div className='mt-4'>
        <label htmlFor="division" className="block mb-2">Select Division</label>
        <select
          id="division"
          value={selectedDivision}
          onChange={(e) => setSelectedDivision(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">-- Select Division --</option>
          {divisions?.map((division) => (
            <option key={division.id} value={division.id}>{division.division}</option>
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
          {districts?.map((district) => (
            <option key={district.id} value={district.id}>{district.district}</option>
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
          {subDistricts?.upazillas?.map((UP:any) => (
            <option key={UP.id} value={UP.id}>{UP}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectDivision;
