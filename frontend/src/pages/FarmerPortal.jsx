import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Sprout, Send, Clock, LogOut, Info, AlertTriangle, Sun, Moon, Globe } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const FarmerPortal = () => {
  const { user, logout } = useContext(AuthContext);
  const { t, language, changeLanguage } = useContext(LanguageContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    cropType: '', problemDescription: '', farmSize: ''
  });
  const navigate = useNavigate();

  useEffect(() => { fetchRequests(); }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API_URL}/requests`);
      setRequests(res.data);
    } catch (err) { console.error(err); }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/requests`, formData);
      setFormData({ cropType: '', problemDescription: '', farmSize: '' });
      fetchRequests();
    } catch (err) { console.error(err); }
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-logo">
          <div className="icon"><Sprout size={24} /></div>
          AgriConnect
        </div>
        
        <div style={{ flex: 1 }}>
          <div className="nav-item active"><Send className="icon" /> {t('submitRequest')}</div>
          <div className="nav-item"><Clock className="icon" /> {t('requestHistory')}</div>
        </div>
        
        <div style={{ borderTop: '1px solid rgba(15,23,42,0.05)', paddingTop: '1rem' }}>
          <div style={{ marginBottom: '1rem', padding: '0 1rem' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-main)' }}>{user?.fullName}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('farmer')} • {user?.location}</div>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', padding: '0 1rem', marginBottom: '1rem' }}>
            <button onClick={toggleTheme} className="btn btn-outline" style={{ padding: '0.5rem', flex: 1 }}>
              {isDarkMode ? <Sun size={18} color="var(--secondary)" /> : <Moon size={18} />}
            </button>
            <div className="btn btn-outline" style={{ padding: '0.5rem', flex: 1, display: 'flex', gap: '0.25rem' }}>
              <Globe size={18} />
              <select value={language} onChange={(e) => changeLanguage(e.target.value)} style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', width: '100%', outline: 'none' }}>
                <option value="en">EN</option><option value="am">AM</option><option value="om">OM</option>
              </select>
            </div>
          </div>

          <div className="nav-item" onClick={handleLogout} style={{ color: 'var(--danger)' }}>
            <LogOut className="icon" /> {t('logout')}
          </div>
        </div>
      </div>

      <div className="main-content">
        <div style={{ marginBottom: '2.5rem' }}>
          <h1>{t('welcomeBack')}, {user?.fullName?.split(' ')[0]} 👋</h1>
          <p>Submit a new problem to get expert agricultural advice.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AlertTriangle size={20} color="var(--primary)" /> {t('submitRequest')}</h3>
            <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
              <div className="input-group">
                <label>{t('cropType')}</label>
                <select name="cropType" className="input-field" value={formData.cropType} onChange={handleChange} required>
                  <option value="" disabled>{t('placeholderCrop')}</option>
                  <option value="Teff">Teff</option>
                  <option value="Coffee">Coffee</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Maize">Maize</option>
                  <option value="Sorghum">Sorghum</option>
                  <option value="Barley">Barley</option>
                  <option value="Sesame">Sesame</option>
                  <option value="Enset">Enset</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="input-group">
                <label>{t('problemDesc')}</label>
                <textarea name="problemDescription" className="input-field" value={formData.problemDescription} onChange={handleChange} rows="4" required style={{ resize: 'none' }} />
              </div>
              <div className="input-group">
                <label>{t('farmSize')}</label>
                <input type="text" name="farmSize" className="input-field" value={formData.farmSize} onChange={handleChange} placeholder="e.g. 2.5" required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}><Send size={18} /> {t('submitProblem')}</button>
            </form>
          </div>

          <div>
            <h3 style={{ marginBottom: '1.5rem' }}>{t('requestHistory')}</h3>
            <div className="grid-cards" style={{ gridTemplateColumns: '1fr' }}>
              {requests.length === 0 ? (
                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <Info size={40} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                  <p>{t('noRequests')}</p>
                </div>
              ) : null}
              {requests.map(req => (
                <div key={req._id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.25rem' }}>{req.cropType}</h4>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{new Date(req.requestDate).toLocaleDateString()} • {req.farmSize} ha</div>
                    </div>
                    <span className={`status-badge status-${req.status.toLowerCase().replace(' ', '')}`}>{req.status}</span>
                  </div>
                  <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', background: 'rgba(15,23,42,0.02)', padding: '1rem', borderRadius: '0.5rem' }}>
                    {req.problemDescription}
                  </p>
                  
                  {req.advisory && req.advisory.advice && (
                    <div style={{ padding: '1.25rem', backgroundColor: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.75rem', borderLeft: '4px solid var(--success)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>
                          {req.officer?.fullName?.[0] || 'O'}
                        </div>
                        <h5 style={{ color: 'var(--success)', margin: 0, fontSize: '0.875rem' }}>{t('advice')}</h5>
                      </div>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: req.advisory.fertilizerRecommendation || req.advisory.pestControlTips ? '1rem' : 0 }}>
                        {req.advisory.advice}
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem' }}>
                        {req.advisory.fertilizerRecommendation && (
                          <div style={{ background: 'var(--surface)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(16,185,129,0.2)' }}>
                            <strong style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.25rem', fontSize: '0.75rem', textTransform: 'uppercase' }}>{t('fertilizer')}</strong>
                            {req.advisory.fertilizerRecommendation}
                          </div>
                        )}
                        {req.advisory.pestControlTips && (
                          <div style={{ background: 'var(--surface)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(16,185,129,0.2)' }}>
                            <strong style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.25rem', fontSize: '0.75rem', textTransform: 'uppercase' }}>{t('pestControl')}</strong>
                            {req.advisory.pestControlTips}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerPortal;
