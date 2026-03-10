document.addEventListener('DOMContentLoaded', async () => {
    // ดึงข้อมูลการวิเคราะห์ประชากรจาก Backend
    const dashboardData = await ApiClient.get('getHospitalDashboard', { hospital_id: 'ALL' });
    
    if(dashboardData && dashboardData.status === 'success') {
        const data = dashboardData.data;
        
        // อัปเดตตัวเลขแสดงผล
        document.getElementById('metric-normal').innerText = data.normalCount;
        document.getElementById('metric-monitor').innerText = data.monitorCount;
        document.getElementById('metric-delay').innerText = data.delayCount;

        // วาดกราฟด้วย Chart.js
        const ctx = document.getElementById('domainChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['กล้ามเนื้อมัดใหญ่', 'กล้ามเนื้อมัดเล็ก', 'การเข้าใจภาษา', 'การใช้ภาษา', 'การช่วยเหลือตัวเองและสังคม'],
                datasets: [{
                    label: 'จำนวนเด็กที่สงสัยว่าล่าช้า',
                    data: [data.GM_delay, data.FM_delay, data.RL_delay, data.EL_delay, data.PS_delay],
                    backgroundColor: 'rgba(220, 53, 69, 0.7)',
                    borderColor: 'rgba(220, 53, 69, 1)',
                    borderWidth: 1
                }]
            },
            options: { responsive: true, scales: { y: { beginAtZero: true } } }
        });
    }
});