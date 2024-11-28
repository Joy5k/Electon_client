import { useEffect, useState, } from 'react';
import axios from 'axios';
import { IDistrict, IDivision, ISubDistrict } from '../../types';

const SelectDivision = ({ setAddress,disabled,userData }: any) => {
  const [divisions, setDivisions] = useState<IDivision[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [subDistricts, setSubDistricts] = useState<ISubDistrict[]>([]);

  const [selectedDivision, setSelectedDivision] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<string>('');


 // Update the address when sub-district changes
  useEffect(() => {
    if (selectedSubDistrict ) {
      const addressData = {
       
        subDistrict: selectedSubDistrict,
        district: selectedDistrict,
        division: selectedDivision,
       
      };
      setAddress(addressData);
    }
  }, [selectedSubDistrict, selectedDistrict, selectedDivision, setAddress]);

  // Fetch divisions from the API
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response: any = await axios.get<IDivision[]>('https://bdapis.com/api/v1.2/divisions');
        setDivisions(response?.data?.data);
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
          const response: any = await axios.get<IDistrict[]>(`https://bdapis.com/api/v1.2/division/${selectedDivision}`);
          setDistricts(response?.data?.data);
          setSelectedDistrict('');
          setSelectedSubDistrict('');
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      } else {
        setDistricts([]);
      }
    };
    fetchDistricts();
  }, [selectedDivision]);

  // Fetch sub-districts based on the selected district
  useEffect(() => {
    const fetchSubDistricts = async (): Promise<void> => {
      if (selectedDistrict) {
        try {
          const response: any = await axios.get(`https://bdapis.com/api/v1.2/district/${selectedDistrict}`);
          setSubDistricts(response?.data?.data[0]?.upazillas);
          setSelectedSubDistrict('');
        } catch (error) {
          console.error('Error fetching sub-districts:', error);
        }
      } else {
        setSubDistricts([]);
      }
    };
    fetchSubDistricts();
  }, [selectedDistrict]);

  return (
    <div className="space-y-4 flex flex-col md:flex-row lg:flex-row align-middle items-start gap-5">
      <div className='mt-4'>
        <label htmlFor="division" className="block mb-1">Division</label>
        <select
          id="division"
          value={selectedDivision}
          disabled={disabled}
          onChange={(e) => setSelectedDivision(e.target.value)}
        defaultValue={userData?.data?.address?.division}
          className="border p-2 w-40"
        >
          <option value="">{userData?.data?.address?.division ||"-- Select Division --"}</option>
          {divisions?.map((division) => (
            <option key={division?.division} value={division?.id}>{division?.division}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="district" className="block mb-1">District</label>
        <select
          id="district"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="border p-2 w-40"
          disabled={!selectedDivision}
        >
          <option value="">{userData?.data?.address?.district ||"-- Select District --"}</option>
          {districts?.map((district) => (
            <option key={district.id} value={district?.id}>{district?.district}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="subDistrict" className="block mb-1">Sub-District</label>
        <select
          id="subDistrict"
          value={selectedSubDistrict}
          onChange={(e) => setSelectedSubDistrict(e.target.value)}
          className="border p-2 w-40"
          disabled={!selectedDistrict}
        >
          <option value="">{userData?.data?.address?.subDistrict ||"-- Select Sub-District --"}</option>
          {subDistricts?.map((UP: any) => (
            <option key={UP.id} value={UP.id}>{UP}</option>
          ))}
        </select>
      </div>

     
    </div>
  );
};

export default SelectDivision;
