import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { ThemeContext } from '../context/ThemeContext';
import { Sprout, LayoutDashboard, Users, LogOut, Tractor, Activity, CheckCircle, TrendingUp, Sun, Moon, Globe } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { t, language, changeLanguage } = useContext(LanguageContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalFarmers: 0, activeRequests: 0, solvedRequests: 0
  });

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/requests/dashboard`);
      setStats(res.data);
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
        <div style={{ marginBottom: '3rem' }}>
          <h1>{t('systemOverview')}</h1>
          <p>Real-time analytics and platform metrics.</p>
        </div>

        <div className="grid-cards" style={{ marginBottom: '3rem' }}>
          <div className="glass-panel stat-card" style={{ padding: '2rem' }}>
            <Users className="icon-bg" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.5rem', background: 'rgba(5, 150, 105, 0.1)', borderRadius: '0.5rem', color: 'var(--primary)' }}><Tractor size={20} /></div>
              <h3 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1rem' }}>{t('totalFarmers')}</h3>
            </div>
            <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1' }}>
              {stats.totalFarmers}
            </div>
          </div>

          <div className="glass-panel stat-card" style={{ padding: '2rem' }}>
            <Activity className="icon-bg" style={{ color: 'var(--warning)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.5rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '0.5rem', color: 'var(--warning)' }}><Activity size={20} /></div>
              <h3 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1rem' }}>{t('activeRequests')}</h3>
            </div>
            <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--warning)', lineHeight: '1' }}>
              {stats.activeRequests}
            </div>
          </div>

          <div className="glass-panel stat-card" style={{ padding: '2rem' }}>
            <CheckCircle className="icon-bg" style={{ color: 'var(--success)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', color: 'var(--success)' }}><CheckCircle size={20} /></div>
              <h3 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1rem' }}>{t('solvedCases')}</h3>
            </div>
            <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--success)', lineHeight: '1' }}>
              {stats.solvedRequests}
            </div>
          </div>
        </div>
        
        <div className="glass-panel" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
          <TrendingUp className="icon-bg" style={{ width: '300px', height: '300px', color: 'var(--primary)', right: '-2rem', bottom: '-2rem' }} />
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px' }}>
            <h2 style={{ marginBottom: '1rem' }}>Digital Extension Services</h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '2rem' }}>
              Our platform bridges the gap between traditional farming and expert knowledge. By leveraging real-time data and role-based advisory routing, we ensure that every crop problem receives immediate, professional attention.
            </p>
            <Link to="/officer" className="btn btn-primary">
              Review Pending Requests <TrendingUp size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
