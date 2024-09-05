// pages/index.tsx
import { useState } from "react";

const Home = () => {
  const [formData, setFormData] = useState({
    simCardId: "",
    simCardSerialNo: "",
    gsmNo: "",
    tariffInfo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/simcard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("SIM kart bilgileri başarıyla kaydedildi!");
      setFormData({
        simCardId: "",
        simCardSerialNo: "",
        gsmNo: "",
        tariffInfo: "",
      });
    } else {
      alert("Kaydetme işlemi başarısız oldu.");
    }
  };

  return (
    <div>
      <h1>SIM Kart Bilgileri Formu</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='simCardId'
          placeholder='SIM Kart ID'
          value={formData.simCardId}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='simCardSerialNo'
          placeholder='SIM Kart Seri No'
          value={formData.simCardSerialNo}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='gsmNo'
          placeholder='GSM No'
          value={formData.gsmNo}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='tariffInfo'
          placeholder='Tarife Bilgisi'
          value={formData.tariffInfo}
          onChange={handleChange}
          required
        />
        <button type='submit'>Kaydet</button>
      </form>
    </div>
  );
};

export default Home;
