import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { ThemeContext } from '../context/ThemeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sprout, LayoutDashboard, Users, MessageSquare, LogOut, Send, MapPin, Sun, Moon, Globe } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const OfficerPortal = () => {
  const { user, logout } = useContext(AuthContext);
  const { t, language, changeLanguage } = useContext(LanguageContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [advisoryData, setAdvisoryData] = useState({
    advice: '', fertilizerRecommendation: '', pestControlTips: '', status: 'In Progress'
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { fetchRequests(); }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API_URL}/requests`);
      setRequests(res.data);
    } catch (err) { console.error(err); }
  };

  const handleSelect = (req) => {
    setSelectedRequest(req);
    setAdvisoryData({
      advice: req.advisory?.advice || '',
      fertilizerRecommendation: req.advisory?.fertilizerRecommendation || '',
      pestControlTips: req.advisory?.pestControlTips || '',
      status: req.status === 'Pending' ? 'In Progress' : req.status
    });
  };

  const handleAdvisoryChange = (e) => setAdvisoryData({ ...advisoryData, [e.target.name]: e.target.value });

  const handleSubmitAdvisory = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/requests/${selectedRequest._id}/advise`, advisoryData);
      setSelectedRequest(null);
      fetchRequests();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-logo">
          <div className="icon"><Sprout size={24} /></div>
          AgriConnect
        </div>
        
        <div style={{ flex: 1 }}>
          <Link to="/dashboard" className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}><LayoutDashboard className="icon" /> {t('dashboard')}</Link>
          <Link to="/officer" className={`nav-item ${location.pathname === '/officer' ? 'active' : ''}`}><Users className="icon" /> {t('allRequests')}</Link>
        </div>
        
        <div style={{ borderTop: '1px solid rgba(15,23,42,0.05)', paddingTop: '1rem' }}>
          <div style={{ marginBottom: '1rem', padding: '0 1rem' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-main)' }}>{user?.fullName}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('extensionOfficer')} • {user?.location}</div>
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

          <div className="nav-item" onClick={() => { logout(); navigate('/login'); }} style={{ color: 'var(--danger)' }}>
            <LogOut className="icon" /> {t('logout')}
          </div>
        </div>
      </div>

      <div className="main-content">
        <div style={{ marginBottom: '2.5rem' }}>
          <h1>{t('allRequests')}</h1>
          <p>Review farmer problems and dispatch expert advice.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selectedRequest ? '1fr 1.2fr' : '1fr', gap: '2rem', alignItems: 'start' }}>
          <div className="grid-cards" style={{ gridTemplateColumns: selectedRequest ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))', alignContent: 'start' }}>
            {requests.map(req => (
              <div 
                key={req._id} 
                className="card" 
                style={{ cursor: 'pointer', border: selectedRequest?._id === req._id ? '2px solid var(--primary)' : '' }} 
                onClick={() => handleSelect(req)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <h4 style={{ margin: 0 }}>{req.cropType}</h4>
                  <span className={`status-badge status-${req.status.toLowerCase().replace(' ', '')}`}>{req.status}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  <MapPin size={14} /> {req.farmer?.fullName} ({req.farmer?.location})
                </div>
                <p style={{ fontSize: '0.95rem', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {req.problemDescription}
                </p>
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(15,23,42,0.05)', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{new Date(req.requestDate).toLocaleDateString()}</span>
                  <span>{req.farmSize} ha</span>
                </div>
              </div>
            ))}
          </div>

          {selectedRequest && (
            <div className="glass-panel" style={{ padding: '2.5rem', position: 'sticky', top: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MessageSquare size={20} color="var(--primary)" /> {t('provideAdvice')}</h3>
                <span className={`status-badge status-${selectedRequest.status.toLowerCase().replace(' ', '')}`}>{selectedRequest.status}</span>
              </div>
              
              <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'rgba(15,23,42,0.02)', borderRadius: '1rem', border: '1px solid rgba(15,23,42,0.05)' }}>
                <div style={{ fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.125rem' }}>{selectedRequest.cropType}</div>
                <p style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>{selectedRequest.problemDescription}</p>
                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  <div><strong style={{ color: 'var(--text-main)' }}>{t('farmer')}:</strong> {selectedRequest.farmer?.fullName}</div>
                  <div><strong style={{ color: 'var(--text-main)' }}>Size:</strong> {selectedRequest.farmSize} ha</div>
                </div>
              </div>
              
              <form onSubmit={handleSubmitAdvisory}>
                <div className="input-group">
                  <label>{t('advice')}</label>
                  <textarea name="advice" className="input-field" value={advisoryData.advice} onChange={handleAdvisoryChange} rows="4" required style={{ resize: 'vertical' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="input-group">
                    <label>{t('fertilizer')}</label>
                    <select name="fertilizerRecommendation" className="input-field" value={advisoryData.fertilizerRecommendation} onChange={handleAdvisoryChange}>
                      <option value="">None / Not Required</option>
                      <option value="NPS">NPS</option>
                      <option value="Urea">Urea</option>
                      <option value="DAP">DAP</option>
                      <option value="Organic Compost">Organic Compost</option>
                      <option value="Bio-fertilizer">Bio-fertilizer</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>{t('pestControl')}</label>
                    <select name="pestControlTips" className="input-field" value={advisoryData.pestControlTips} onChange={handleAdvisoryChange}>
                      <option value="">None / Not Required</option>
                      <option value="Neem Extract">Neem Extract</option>
                      <option value="Chemical Pesticide">Chemical Pesticide</option>
                      <option value="Biological Control">Biological Control</option>
                      <option value="Crop Rotation">Crop Rotation</option>
                    </select>
                  </div>
                </div>
                <div className="input-group">
                  <label>{t('status')}</label>
                  <select name="status" className="input-field" value={advisoryData.status} onChange={handleAdvisoryChange}>
                    <option value="In Progress">In Progress</option>
                    <option value="Solved">Solved</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}><Send size={18} /> Submit Advice</button>
                  <button type="button" className="btn btn-outline" onClick={() => setSelectedRequest(null)}>Cancel</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficerPortal;
